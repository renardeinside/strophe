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

export const getPreparedTab = async (context: BrowserContext) => {
  const newtab = await context.newPage();
  await newtab.goto("chrome://newtab");
  await newtab.waitForSelector("#root > div > nav > svg");
  await newtab.waitForSelector(".ProseMirror");
  return newtab;
};

export const test = base.extend<ExtensionFixtures>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../dist");
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--headless=new`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  newtab: async ({ context }, use) => {
    const newtab = await getPreparedTab(context);
    await use(newtab);
    await newtab.close();
  },
});

export { expect } from "@playwright/test";
