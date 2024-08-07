import "@/styles/globals.css";
import { IconProvider } from "@synopsisapp/symbiosis-ui";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IconProvider>
      <Component {...pageProps} />;
    </IconProvider>
  );
}
