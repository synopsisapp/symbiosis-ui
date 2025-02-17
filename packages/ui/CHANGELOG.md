# @synopsisapp/symbiosis-ui

## 0.2.0

### Minor Changes

- [#43](https://github.com/synopsisapp/symbiosis-ui/pull/43) [`af2a65b`](https://github.com/synopsisapp/symbiosis-ui/commit/af2a65b3dc3d56a59bdd1622f7c19969ebd33381) Thanks [@bratsos](https://github.com/bratsos)! - ### Features

  - feat: add new lint and format scripts with fix variants
  - feat: upgrade Node.js to v23.8.0 and add automated changeset creation
  - feat(ui): add labelWeight prop to DateField and DateRangeField components
  - feat(DateField): add defaultValue prop support for date input components
  - feat(DatePicker): add support for default dates in all picker modes
  - feat: add content alignment option on Switch

  ### Fixes

  - fix component styles

  ### Refactors

  - refactor: try to make nextjs example work, not working yet

  ### Other Changes

  - chore: run lint and format everywhere
  - docs: simplify and modernize README.md documentation
  - Update examples/nextjs-demo/src/styles/globals.css
  - unify some border radius
  - tailwind upgrade

  ### Full Changelog

  - [`e93da5a`](https://github.com/synopsisapp/symbiosis-ui/commit/e93da5afd6283ea3154df6c79a7b35c28be00443) Thanks [@bratsos](https://github.com/bratsos)! - chore: run lint and format everywhere
  - [`7261be7`](https://github.com/synopsisapp/symbiosis-ui/commit/7261be71ed910bcc4b56266372e459e384a448ac) Thanks [@bratsos](https://github.com/bratsos)! - feat: add new lint and format scripts with fix variants
  - [`453534c`](https://github.com/synopsisapp/symbiosis-ui/commit/453534cf0c85a5ad072c97b7afe836ec3c359586) Thanks [@bratsos](https://github.com/bratsos)! - feat: upgrade Node.js to v23.8.0 and add automated changeset creation
  - [`6d1705a`](https://github.com/synopsisapp/symbiosis-ui/commit/6d1705a7fca654c6beba72e9e264ace01b8c72cf) Thanks [@bratsos](https://github.com/bratsos)! - docs: simplify and modernize README.md documentation
  - [`a03f7b7`](https://github.com/synopsisapp/symbiosis-ui/commit/a03f7b724e0777b10e467248fb48a2c18dcb8735) Thanks [@bratsos](https://github.com/bratsos)! - feat(ui): add labelWeight prop to DateField and DateRangeField components
  - [`23211d6`](https://github.com/synopsisapp/symbiosis-ui/commit/23211d69c2f1b6fa049a0deece270a9000217f01) Thanks [@bratsos](https://github.com/bratsos)! - feat(DateField): add defaultValue prop support for date input components
  - [`47c8d50`](https://github.com/synopsisapp/symbiosis-ui/commit/47c8d50d26ad3c11fe50553806d46c20b23b8df0) Thanks [@bratsos](https://github.com/bratsos)! - feat(DatePicker): add support for default dates in all picker modes
  - [`32deb4f`](https://github.com/synopsisapp/symbiosis-ui/commit/32deb4fe11d2122fbb07c0eeecbeefa0ee053b52) Thanks [@bratsos](https://github.com/bratsos), [@christosmylonas92](https://github.com/christosmylonas92)! - Update examples/nextjs-demo/src/styles/globals.css
  - [`27f51e8`](https://github.com/synopsisapp/symbiosis-ui/commit/27f51e843caa0e2d3f40a4e2f025b77212d452cd) Thanks [@bratsos](https://github.com/bratsos)! - refactor: try to make nextjs example work, not working yet
  - [`eb0fce4`](https://github.com/synopsisapp/symbiosis-ui/commit/eb0fce4f65310d2cb88d5d5f22db87a93a940520) Thanks [@bratsos](https://github.com/bratsos)! - feat: add content alignment option on Switch
  - [`2f05c6f`](https://github.com/synopsisapp/symbiosis-ui/commit/2f05c6f2af79110b47814a8be8f1787c1a768ef0) Thanks [@bratsos](https://github.com/bratsos)! - unify some border radius
  - [`42e0580`](https://github.com/synopsisapp/symbiosis-ui/commit/42e058028b2c64ea228d513e77a80893c73cb8a1) Thanks [@bratsos](https://github.com/bratsos)! - fix component styles
  - [`f310d5a`](https://github.com/synopsisapp/symbiosis-ui/commit/f310d5afed6a0974a3d366874d21adccf4b5ebe0) Thanks [@bratsos](https://github.com/bratsos)! - tailwind upgrade

## 0.1.29

### Patch Changes

- [`6f27af3`](https://github.com/synopsisapp/symbiosis-ui/commit/6f27af3d42a9a32cfbd78832fee184913b8198cb) Thanks [@bratsos](https://github.com/bratsos)! - ---

  ## "@synopsisapp/symbiosis-ui": minor

  Add skipComposition prop to portal-based components and demonstrate nested behavior in Storybook

  - New `skipComposition` prop added to Dropdown, Popover, Select, and Tooltip components
  - Added ShowcaseSkipComposition story demonstrating nested component behavior
  - Implemented z-index support examples for proper component stacking
