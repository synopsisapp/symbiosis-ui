import * as React from 'react';

import type { Preview } from "@storybook/react";
import { IconProvider } from "@synopsisapp/symbiosis-ui";
import '../src/tailwind.css'
import "../public/symbiosis-assets/symbiosis-ui.css"


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
      <IconProvider>
        <Story />
      </IconProvider>
    ),
  ],
};

export default preview;
