# Symbiosis UI

Symbiosis UI is a powerful and flexible React component library designed to accelerate your development process. It offers a suite of customizable UI components that seamlessly integrate with React-based projects, providing a robust foundation for building modern web applications.

## Features

- Customizable components powered by Tailwind CSS
- Full TypeScript support
- Seamless integration with popular frameworks (Next.js, Remix, Vite)
- Advanced theming capabilities
- Automated icon system with SVG sprite generation and type safety
- Webpack and Vite plugins for effortless setup

## Installation

Install Symbiosis UI via npm or yarn:

```bash
npm install @synopsisapp/symbiosis-ui
# or
yarn add @synopsisapp/symbiosis-ui
```

## Setup

### 1. Configure the Plugin

Choose the appropriate plugin based on your build tool:

#### For Vite:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { symbiosisUIPlugin } from '@synopsisapp/symbiosis-ui/plugin';

export default defineConfig({
  plugins: [
    symbiosisUIPlugin({
      tailwindTheme: {}, // Your custom Tailwind theme
      tailwindContent: [], // Additional content for Tailwind to scan
      iconsDir: './assets/icons', // Directory containing your SVG icons
      publicDir: './public', // Output directory for generated assets
    }),
  ],
});
```

#### For Webpack:

```javascript
// webpack.config.js
const { SymbiosisUIWebpackPlugin } = require('@synopsisapp/symbiosis-ui/plugin');

module.exports = {
  // ... other webpack config
  plugins: [
    new SymbiosisUIWebpackPlugin({
      tailwindTheme: {}, // Your custom Tailwind theme
      tailwindContent: [], // Additional content for Tailwind to scan
      iconsDir: './assets/icons', // Directory containing your SVG icons
      publicDir: './public', // Output directory for generated assets
    }),
  ],
};
```

### 2. Set up the SymbiosisProvider

Wrap your application with the `SymbiosisProvider`:

```jsx
import { SymbiosisProvider } from '@synopsisapp/symbiosis-ui';

function App() {
  return (
    <SymbiosisProvider publicDir="/public" scheme="dark">
      {/* Your app components */}
    </SymbiosisProvider>
  );
}
```

### 3. Import the Generated CSS

Include the generated CSS file in your project. Add this to your main CSS file or entry point:

```css
@import '<publicDir>/symbiosis-assets/symbiosis-ui.css';
```

Replace `<publicDir>` with the actual path to your public directory.

## Usage

Here's a simple example of using a Symbiosis UI component:

```jsx
import { Button } from '@synopsisapp/symbiosis-ui';

function MyComponent() {
  return (
    <Button 
      label="Click me" 
      variant="primary" 
      onPress={() => console.log('Button clicked')} 
    />
  );
}
```

## Components

Symbiosis UI includes the following core components:

- Button
- IconButton
- Icon
- Spinner
- Text

Each component offers various props for customization. Refer to the component's type definitions for detailed information on available props.

## Theming

Symbiosis UI leverages Tailwind CSS for styling. Customize the theme by providing your own Tailwind configuration through the plugin options. The library generates styles based on your custom theme, ensuring components align with your project's design system.

## Icon System

The Symbiosis UI icon system automates the process of working with SVG icons:

1. Place SVG files in the `iconsDir` specified in the plugin configuration.
2. The plugin generates:
   - An SVG sprite (`<publicDir>/symbiosis-assets/sprite.svg`)
   - TypeScript definitions (`<publicDir>/symbiosis-assets/types.d.ts`)
   - A JSON array of icon names (`<publicDir>/symbiosis-assets/iconNames.json`)

Use icons in your components with type safety:

```tsx
import { Icon } from '@synopsisapp/symbiosis-ui';

function MyComponent() {
  return <Icon name="my-custom-icon" />;
}
```

## Plugins

The Symbiosis UI plugins (for Webpack and Vite) handle asset generation, theming, and icon sprite creation. They accept these configuration options:

- `tailwindTheme`: (optional) Your custom Tailwind theme object.
- `tailwindContent`: (optional) Additional content paths for Tailwind to scan.
- `iconsDir`: (optional) Directory containing your SVG icons (default: 'assets/icons').
- `publicDir`: (optional) Output directory for generated assets (default: 'public').

## Examples

Explore example projects demonstrating Symbiosis UI integration:

- Next.js: `examples/nextjs-demo`
- Remix: `examples/remix-demo`
- Storybook: `examples/storybook`

These examples showcase setup and usage in various environments.

## Development

To contribute or run Symbiosis UI locally:

1. Clone the repository
2. Install dependencies: `npm install` or `yarn`
3. Build the library: `npm run build` or `yarn build`
4. Run tests: `npm test` or `yarn test`

## License

Symbiosis UI is released under the MIT License. See the LICENSE file for details.

## Support

For issues, feature requests, or questions, please open an issue on the GitHub repository.

We're excited for you to experience the power and flexibility of Symbiosis UI in your projects!
