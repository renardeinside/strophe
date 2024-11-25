import { test, expect } from "./fixtures";

test("on the first load, a welcome toast should be visible", async ({
  newtab,
}) => {
  const toast = await newtab.waitForSelector(
    'text="✨ Welcome to Strophe. Add some sparkle to your notes."'
  );
  expect(toast).not.toBeNull();
});
