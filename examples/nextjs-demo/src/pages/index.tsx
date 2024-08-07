import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@synopsisapp/symbiosis-ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Button label="Hello, World!" leftIcon="heart" />
    </main>
  );
}
