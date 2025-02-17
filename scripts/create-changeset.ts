import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { Octokit } from "@octokit/rest";

type VersionType = "major" | "minor" | "patch";
type CommitType = "feat" | "fix" | "refactor" | "other";

interface Commit {
  hash: string;
  author: string;
  username: string;
  coAuthors: Array<{ name: string; username: string }>;
  message: string;
  type: CommitType;
}

interface UsernameCache {
  [email: string]: string;
}

const CACHE_FILE = join(process.cwd(), ".changeset", ".username-cache.json");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const rl = createInterface({ input: process.stdin, output: process.stdout });

async function loadUsernameCache(): Promise<UsernameCache> {
  try {
    if (existsSync(CACHE_FILE))
      return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
  } catch (_error) {}
  return {};
}

async function saveUsernameCache(cache: UsernameCache): Promise<void> {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function getGitHubUsername(email: string): Promise<string> {
  const cache = await loadUsernameCache();
  if (cache[email]) return cache[email];

  try {
    const commitResponse = await octokit.rest.search.commits({
      q: `author-email:${email}`,
      per_page: 10,
      sort: "author-date",
      order: "desc",
    });

    if (commitResponse.data.items?.[0]?.author?.login) {
      const username = commitResponse.data.items[0].author.login;
      cache[email] = username;
      await saveUsernameCache(cache);
      return username;
    }

    const { data: user } = await octokit.rest.users.getByUsername({
      username: email.split("@")[0],
    });

    if (user.login) {
      cache[email] = user.login;
      await saveUsernameCache(cache);
      return user.login;
    }
  } catch (_error) {}

  const fallback = email.split("@")[0];
  cache[email] = fallback;
  await saveUsernameCache(cache);
  return fallback;
}

async function getCoAuthorUsername(
  emailOrGithubEmail: string,
  _name: string,
): Promise<string> {
  const cache = await loadUsernameCache();
  if (cache[emailOrGithubEmail]) return cache[emailOrGithubEmail];

  if (emailOrGithubEmail.endsWith("@users.noreply.github.com")) {
    const username = emailOrGithubEmail.split("@")[0].replace(/^\d+\+/, "");

    try {
      // Verify the username exists and get their info
      const { data: user } = await octokit.rest.users.getByUsername({
        username,
      });

      if (user.email) {
        // Cache both the noreply and real email if available
        cache[emailOrGithubEmail] = username;
        cache[user.email] = username;
        await saveUsernameCache(cache);
      } else {
        // Cache just the noreply email
        cache[emailOrGithubEmail] = username;
        await saveUsernameCache(cache);
      }

      return username;
    } catch (_error) {
      console.warn(`Failed to verify GitHub username ${username}`);
      return username;
    }
  }

  // For regular emails, use the same GitHub API lookup as main authors
  return getGitHubUsername(emailOrGithubEmail);
}

function getCommitType(message: string): CommitType {
  if (message.startsWith("feat")) return "feat";
  if (message.startsWith("fix")) return "fix";
  if (message.startsWith("refactor")) return "refactor";
  return "other";
}

async function getCommits(): Promise<Commit[]> {
  const format = "%H|%an|%ae|%s";
  const rawCommits = execSync(
    `git log main..HEAD --pretty=format:"${format}"%n###COMMIT###`,
  )
    .toString()
    .trim()
    .split("###COMMIT###")
    .filter(Boolean);

  return Promise.all(
    rawCommits.map(async (commitInfo) => {
      const [hash, author, email, fullMessage] = commitInfo.trim().split("|");

      const coAuthorMessage = execSync(
        `git log -1 ${hash} --pretty=format:"%b"`,
      ).toString();
      const coAuthors = await Promise.all(
        coAuthorMessage
          .split("\n")
          .filter((line) => line.startsWith("Co-authored-by:"))
          .map(async (line) => {
            const match = line.match(/Co-authored-by:\s*(.*?)\s*<(.+?)>/);
            if (!match) return null;
            const [, name, emailOrGithubEmail] = match;
            const username = await getCoAuthorUsername(
              emailOrGithubEmail,
              name,
            );
            return { name, username };
          }),
      );

      const username = await getGitHubUsername(email);

      return {
        hash,
        author,
        username,
        coAuthors: coAuthors.filter(
          (author): author is { name: string; username: string } =>
            author !== null,
        ),
        message: fullMessage.trim(),
        type: getCommitType(fullMessage.trim()),
      };
    }),
  );
}

function formatFullCommit(commit: Commit, repoUrl: string): string {
  const authors = [
    `[@${commit.username}](https://github.com/${commit.username})`,
    ...commit.coAuthors.map(
      (ca) => `[@${ca.username}](https://github.com/${ca.username})`,
    ),
  ];

  return `- [\`${commit.hash.slice(0, 7)}\`](${repoUrl}/commit/${commit.hash}) Thanks ${authors.join(", ")}! - ${commit.message}`;
}

interface ChangesetContent {
  packageName: string;
  versionType: VersionType;
  repoUrl: string;
  commits: Commit[];
}

function generateChangesetContent({
  packageName,
  versionType,
  repoUrl,
  commits,
}: ChangesetContent): string {
  const categorizedCommits = {
    feat: commits.filter((c) => c.type === "feat"),
    fix: commits.filter((c) => c.type === "fix"),
    refactor: commits.filter((c) => c.type === "refactor"),
    other: commits.filter((c) => c.type === "other"),
  };

  const sections = [
    categorizedCommits.feat.length
      ? `\n### Features\n${categorizedCommits.feat.map((c) => `- ${c.message}`).join("\n")}`
      : "",
    categorizedCommits.fix.length
      ? `\n### Fixes\n${categorizedCommits.fix.map((c) => `- ${c.message}`).join("\n")}`
      : "",
    categorizedCommits.refactor.length
      ? `\n### Refactors\n${categorizedCommits.refactor.map((c) => `- ${c.message}`).join("\n")}`
      : "",
    categorizedCommits.other.length
      ? `\n### Other Changes\n${categorizedCommits.other.map((c) => `- ${c.message}`).join("\n")}`
      : "",
    `\n### Full Changelog\n${commits.map((c) => formatFullCommit(c, repoUrl)).join("\n")}`,
  ].filter(Boolean);

  return `---
"${packageName}": ${versionType}
---
${sections.join("\n")}`;
}

function getVersionType(): Promise<VersionType> {
  return new Promise((resolve, reject) => {
    rl.question(
      "What kind of change is this? (major/minor/patch): ",
      (answer: string) => {
        const version = answer.toLowerCase() as VersionType;
        if (!["major", "minor", "patch"].includes(version)) {
          rl.close();
          reject(
            new Error("Invalid version type. Must be major, minor, or patch."),
          );
          return;
        }
        rl.close();
        resolve(version);
      },
    );
  });
}

// Make sure main() shows errors
async function main() {
  try {
    const commits = await getCommits();
    if (commits.length === 0) {
      throw new Error("No commits found between main and current branch");
    }

    const versionType = await getVersionType();
    const changesetContent = generateChangesetContent({
      packageName: "@synopsisapp/symbiosis-ui",
      versionType,
      repoUrl: "https://github.com/synopsisapp/symbiosis-ui",
      commits,
    });

    const changesetDir = join(process.cwd(), ".changeset");
    const changesetFile = `auto-changeset-${Date.now()}.md`;
    const filePath = join(changesetDir, changesetFile);

    writeFileSync(filePath, changesetContent);
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(
    "Unhandled error:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
