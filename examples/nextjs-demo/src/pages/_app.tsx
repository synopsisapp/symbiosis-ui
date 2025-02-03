import "../styles/globals.css";
import { SymbiosisProvider } from "@synopsisapp/symbiosis-ui";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SymbiosisProvider>
      <Component {...pageProps} />
    </SymbiosisProvider>
  );
}
