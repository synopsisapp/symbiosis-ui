import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { IconProvider } from "@synopsisapp/symbiosis-ui";
// eslint-disable-next-line import/no-unresolved
import stylesheet from "~/tailwind.css?url";
// eslint-disable-next-line import/no-unresolved
import symbiosisUIStylesheet from "/symbiosis-assets/symbiosis-ui.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: symbiosisUIStylesheet },
    { rel: "stylesheet", href: stylesheet },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <IconProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </IconProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
