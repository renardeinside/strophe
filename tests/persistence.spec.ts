import { test, expect } from "./fixtures";
import { loremIpsum } from "lorem-ipsum";

test("make sure that text is persistent between page refreshes", async ({
  newtab,
}) => {
  const testText = loremIpsum({ count: 1, units: "sentences" });
  await newtab.keyboard.type(testText);

  // refresh the page
  await newtab.reload();

  // wait for the text to sync
  const input = await newtab.waitForSelector(".ProseMirror");

  // check if the text is still there
  expect(await input.evaluate((node: any) => node.textContent)).toBe(testText);
});
