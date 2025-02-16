# Symbiosis UI

A modern React component library built on top of Radix UI and shadcn conventions, with built-in Tailwind CSS support, designed for building type-safe and theme-aware web applications.

## Features

- Pre-built React components with Tailwind CSS styling
- Custom component compositions and patterns
- Full TypeScript support
- Framework integration with Next.js, Remix and Vite
- Theme system with CSS variables and Tailwind
- Icon system with SVG sprite generation
- Dark/light mode support

## Version Compatibility

- For Tailwind CSS v4.0.0 and above: Use latest version
- For older Tailwind CSS versions: Use version 0.1.28 or below

## Installation

```bash
# For Tailwind >= 4.0.0
npm install @synopsisapp/symbiosis-ui

# For older Tailwind versions
npm install @synopsisapp/symbiosis-ui@0.1.28
```

## Setup

### 1. Add the Plugin

```js
// filepath: vite.config.js or next.config.js
import { symbiosisUIPlugin } from '@synopsisapp/symbiosis-ui/plugin'

export default {
  plugins: [
    symbiosisUIPlugin({
      // Optional: SVG icons directory (default: 'assets/icons')
      iconsDir: './assets/icons',
      
      // Optional: Output directory (default: 'public') 
      publicDir: './public'
    })
  ]
}
```

### 2. Configure CSS

Your main CSS file needs two essential configurations:

1. Import the theme layer from Symbiosis UI
2. Configure the source path for Tailwind to detect component classes used by Symbiosis UI

```css
/* filepath: app.css (or global.css or whatever you use as your global css file) */
@import 'tailwindcss';
@import 'tailwindcss/utilities';
@import '@synopsisapp/symbiosis-ui/src/tailwind.css' layer(theme);

@plugin "tailwindcss-animate";

/* Tell Tailwind where to find component classes */
@source "@synopsisapp/symbiosis-ui";

/* Optional: Default border color fix for Tailwind v4 */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

### 3. Add Provider

```jsx
import { SymbiosisProvider } from '@synopsisapp/symbiosis-ui'

function App() {
  return (
    <SymbiosisProvider scheme="light">
      <YourApp />
    </SymbiosisProvider>
  )
}
```

## Theming

The library uses CSS variables for theming. At minimum, you need to define your main color palette:

```css
@theme {
  /* Default: Main Color Palette */
  --color-main-light-400: #E6F3FF;
  --color-main-light-300: #B3D4FF;
  --color-main-light-200: #4490FF;
  --color-main-light-100: #2252FF;
  --color-main-base: #000aff;
  --color-main-dark-100: #120BD4;
  --color-main-dark-200: #2313AC;
  --color-main-dark-300: #2C1787;
  --color-main-dark-400: #2C1966;
  --color-main-dark-500: #271747;
}
```

<details>
<summary>View all available theme options</summary>

The library supports extensive theming options including:
- Gray and Slate color scales
- Button variants (Primary, Outline, Ghost, Link)
- Destructive states
- Monochrome variants
- Focus ring customization

Available theme variables can be found in our [theme configuration file](https://github.com/synopsisapp/symbiosis-ui/blob/main/packages/ui/src/tailwind.css).

</details>

## Components

Browse our component library and view live examples at [symbiosis.synopsisapp.com](https://symbiosis.synopsisapp.com/)

Our components are built on top of Radix UI primitives and shadcn conventions, with additional custom compositions and patterns specific to Symbiosis UI.

## Icons

1. Place SVG files in your icons directory
2. The plugin generates:
   - SVG sprite
   - TypeScript types 
   - Icon names list

```tsx
<Icon name="my-icon" />
```

## Development

```bash
git clone https://github.com/synopsisapp/symbiosis-ui.git
cd symbiosis-ui
npm install
npm run build
npm test
```

## License

MIT

## Support

For questions and issues, please open a GitHub issue.
