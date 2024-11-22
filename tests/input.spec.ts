import { test, expect } from "./fixtures";

test("input should be focused by default", async ({ newtab }) => {
    const input = await newtab.waitForSelector(".ProseMirror");
    // input should be focused by default
    expect(await input.evaluate((node: any) => node === document.activeElement)).toBe(true);
});