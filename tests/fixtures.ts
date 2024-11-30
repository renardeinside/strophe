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

import { Locator } from '@playwright/test';

/**
 * Verifies that the Tiptap editor content contains the expected text.
 *
 * @param editorLocator - The Playwright locator for the editor element.
 * @param expectedText - The text to verify is contained within the editor.
 * @throws Error if the expected text is not found in the editor content.
 */
export async function contains(editorLocator: Locator, expectedText: string): Promise<void> {
  const content = await editorLocator.innerText();

  if (!content || !content.includes(expectedText)) {
    throw new Error(`Expected text "${expectedText}" not found in editor content: "${content || ''}"`);
  }
}

/**
 * Verifies that the Tiptap editor content equals the expected text.
 *
 * @param editorLocator - The Playwright locator for the editor element.
 * @param expectedText - The text to verify exactly matches the editor content.
 * @throws Error if the editor content does not exactly match the expected text.
 */
export async function equals(editorLocator: Locator, expectedText: string): Promise<void> {
  const content = await editorLocator.innerText();

  if (content !== expectedText) {
    throw new Error(`Editor content does not match. Expected: "${expectedText}", Found: "${content || ''}"`);
  }
}
