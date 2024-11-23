import { test, expect, getPreparedTab } from "./fixtures";
import { loremIpsum } from "lorem-ipsum";

test("input should be synced across tabs", async ({ context }) => {
  const tab1 = await getPreparedTab(context);
  const tab2 = await getPreparedTab(context);

  const input1 = await tab1.getByRole("textbox");
  const input2 = await tab2.getByRole("textbox");

  const testText = loremIpsum({ count: 1, units: "sentences" });

  await input1.pressSequentially(testText, { delay: 10 }); // type some text in the first tab, slowly like a human

  // wait for 20ms to let the text sync
  await new Promise((resolve) => setTimeout(resolve, 20));

  await expect(input2).toHaveText(testText); // wait for the second tab to sync
});
