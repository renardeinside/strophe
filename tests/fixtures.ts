import {
  test as base,
  chromium,
  Page,
  type BrowserContext,
} from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ExtensionFixtures = {
  context: BrowserContext;
  newtab: Page;
};

export const test = base.extend<ExtensionFixtures>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../dist");
    console.log(`Loading extension from ${pathToExtension}`);
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--headless=new`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    console.log(`Extension loaded`);
    await use(context);
    await context.close();
  },
  newtab: async ({ context }, use) => {
    const newtab = await context.newPage();
    await newtab.goto("chrome://newtab");
    await newtab.waitForSelector("#root > div > nav > svg");
    await use(newtab);
  },
});

export { expect } from "@playwright/test";
