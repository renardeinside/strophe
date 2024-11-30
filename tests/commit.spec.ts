import { test, expect, getPreparedTab, equals } from "./fixtures";
import { loremIpsum } from "lorem-ipsum";

test("Ctrl+Z should only undo the last line after Enter", async ({
    context,
}) => {
    const tab = await getPreparedTab(context);
    const input = await tab.getByRole("textbox");
    // remove all content
    await input.fill("");

    // Generate two sentences of text
    const firstLine = loremIpsum({ count: 1, units: "words" });
    const secondLine = loremIpsum({ count: 1, units: "words" });

    // Type the first line and press Enter
    await input.pressSequentially(firstLine, { delay: 10 });
    await tab.keyboard.press("Enter");

    // Type the second line
    await input.pressSequentially(secondLine, { delay: 10 });

    // Verify both lines are present in the textbox
    await equals(input, `${firstLine}\n\n${secondLine}`);

    // Undo the last line by pressing Ctrl+Z
    await tab.keyboard.press('ControlOrMeta+Z');

    // Verify the second line was removed
    await equals(input, firstLine);
});

test("Ctrl+Z should only undo the last word after Space", async ({
    context,
}) => {
    const tab = await getPreparedTab(context);
    const input = await tab.getByRole("textbox");
    // remove all content
    await input.fill("");

    // Generate two words of text
    const firstWord = loremIpsum({ count: 1, units: "words" });
    const secondWord = loremIpsum({ count: 1, units: "words" });

    // Type the first word and press Space
    await input.pressSequentially(firstWord, { delay: 10 });
    await tab.keyboard.press("Space");

    // Type the second word
    await input.pressSequentially(secondWord, { delay: 10 });

    // Verify both words are present in the textbox
    await equals(input, `${firstWord} ${secondWord}`);

    // Undo the last word by pressing Ctrl+Z
    await tab.keyboard.press('ControlOrMeta+Z');

    // Verify the second word was removed
    await equals(input, firstWord);
});
