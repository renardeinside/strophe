import { test, expect } from "./fixtures";

test("font size should be bigger", async ({ newtab }) => {
    const input = await newtab.waitForSelector(".ProseMirror");
    const fontSize = await input.evaluate((node: any) => window.getComputedStyle(node).fontSize);
    expect(fontSize).toBe("16px");
});