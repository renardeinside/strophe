# Strophe - minimalistic newtab extension for Chrome

Strope is a simple yet functional newtab extension for Chrome.

It features nothing but a single-page note page on your default new tab, where you can write down your thoughts, ideas, or anything you want to remember.

Note is only saved in the local `indexedDB`. No server is involved in the process.

## Installation

Please follow standard Chrome extension installation procedure [here](https://chromewebstore.google.com/detail/strophe/nfeehfdifaamihffeabhamemjjgnfnkp?authuser=0&hl=en-GB)

## Caveats

`Strophe` is not working in `Arc` browser. This is due to the fact that `Arc` browser does not support `newtab` extensions.

## Example

![Strophe](./assets/screenshots/dark.png)

## Support

If you really like Strophe, you can support me by buying me a coffee.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/renardeinside)

## Technologies used

- [Vite](https://vitejs.dev/) - build tool
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - language
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [TipTap](https://www.tiptap.dev/) - rich text editor
- [Y.js](https://yjs.dev/) and [y-indexeddb](https://docs.yjs.dev/getting-started/allowing-offline-editing) - real-time sync between tabs
