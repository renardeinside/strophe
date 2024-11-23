import { test, expect } from "./fixtures";

test("input some text and toggle it as a link", async ({ newtab }) => {
  await newtab.keyboard.type("hello");

  // select the "hello" text we just typed
  await newtab.keyboard.down("Shift");
  await newtab.keyboard.down("Control");
  await newtab.keyboard.press("ArrowLeft");

  // up the keys
  await newtab.keyboard.up("Shift");
  await newtab.keyboard.up("Control");

  const linkButton = await newtab.waitForSelector("button[title='Link']");

  await linkButton.click(); // this should open the link input dialog

  const linkInput = await newtab.waitForSelector("input[name='link']");
  await linkInput.fill("https://google.com");

  const textInput = await newtab.waitForSelector("input[name='text']");
  await textInput.fill("Google");

  const submitButton = await newtab.waitForSelector("button[type='submit']");
  await submitButton.click();

  const link = await newtab.waitForSelector("a");
  expect(await link.textContent()).toBe("Google");
  expect(await link.getAttribute("href")).toBe("https://google.com");

  // check that the "hello" text is not on the page anymore
  const helloText = await newtab.$("text=hello");
  expect(helloText).toBeNull();
});

test("remove a link", async ({ newtab }) => {
  await newtab.keyboard.type("hello");

  // select the "hello" text we just typed
  await newtab.keyboard.down("Shift");
  await newtab.keyboard.down("Control");
  await newtab.keyboard.press("ArrowLeft");

  // up the keys
  await newtab.keyboard.up("Shift");
  await newtab.keyboard.up("Control");

  const linkButton = await newtab.waitForSelector("button[title='Link']");
  await linkButton.click(); // this should open the link input dialog

  const linkInput = await newtab.waitForSelector("input[name='link']");
  await linkInput.fill("https://google.com");

  const textInput = await newtab.waitForSelector("input[name='text']");
  await textInput.fill("Google");

  const submitButton = await newtab.waitForSelector("button[type='submit']");
  await submitButton.click();

  const link = await newtab.waitForSelector("a");
  expect(await link.textContent()).toBe("Google");
  expect(await link.getAttribute("href")).toBe("https://google.com");

  // select the "Google" text we just typed
  await newtab.keyboard.down("Shift");
  await newtab.keyboard.down("Control");
  await newtab.keyboard.press("ArrowLeft");

  // up the keys
  await newtab.keyboard.up("Shift");
  await newtab.keyboard.up("Control");

  const linkButtonAfter = await newtab.waitForSelector("button[title='Link']");
  await linkButtonAfter.click(); // this should open the link input dialog

  const linkInputAfter = await newtab.waitForSelector("input[name='link']");
  await linkInputAfter.fill("");

  // click the submit button to remove the link
  const submitButtonAfter = await newtab.waitForSelector(
    "button[type='submit']"
  );
  await submitButtonAfter.click();

  // check that the "Google" text is not a link anymore
  const googleLink = await newtab.$("a[text='Google']");
  expect(googleLink).toBeNull();
});
