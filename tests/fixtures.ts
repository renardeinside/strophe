import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ExtensionFixtures = {
  context: BrowserContext;
};



export const test = base.extend<ExtensionFixtures>({
  context: async ({}, use) => {
    console.log(`Building extension`);
    // run yarn build
    execSync('yarn build', { stdio: 'inherit' });
    console.log(`Extension built`);
    const pathToExtension = path.join(__dirname, "../dist");
    console.log(`Loading extension from ${pathToExtension}`);
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    console.log(`Extension loaded`);
    await use(context);
    await context.close();
  }
});

export { expect } from "@playwright/test";
