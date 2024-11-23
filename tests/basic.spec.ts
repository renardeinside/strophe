import { test, expect } from "./fixtures";

test("has title", async ({ newtab }) => {
  const title = await newtab.title();
  expect(title).toBe(`Strophe`);
});

test("has logo", async ({ newtab }) => {
  const logo = await newtab.waitForSelector("#root > div > nav > svg");
  expect(logo).toBeTruthy();
});
