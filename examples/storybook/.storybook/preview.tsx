import * as React from 'react';

import type { Preview } from "@storybook/react";
import { SymbiosisProvider } from "@synopsisapp/symbiosis-ui";
import "../src/tailwind.css";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <SymbiosisProvider>
        <Story />
      </SymbiosisProvider>
    ),
  ],
};

export default preview;
