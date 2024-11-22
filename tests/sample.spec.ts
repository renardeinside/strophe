import { test, expect } from './fixtures';

test('has title', async ({ context }) => {
  const newtab = await context.newPage();
  await newtab.goto('chrome://newtab');
  const title = await newtab.title();
  const logo = await newtab.$('#root > div > nav > svg');
  expect(title).toBe(`Strophe`);
});