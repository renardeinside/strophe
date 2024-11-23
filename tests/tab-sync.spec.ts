import { test, expect,getPreparedTab  } from "./fixtures";

test("input should be synced across tabs", async ({ context }) => {
    const tab1 = await getPreparedTab(context);
    const tab2 = await getPreparedTab(context);
    const input1 = await tab1.waitForSelector(".ProseMirror");
    const input2 = await tab2.waitForSelector(".ProseMirror");

}