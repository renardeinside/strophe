import { Extension } from "@tiptap/core";

const ClearMarksOnEnter = Extension.create({
  name: "clearFormattingOnEnter",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        console.log("Enter key pressed");
        editor
          .chain()
          .unsetBold()
          .unsetItalic()
          .unsetUnderline()
          .unsetStrike()
          .unsetLink()
          .run();
        // Allow the default behavior of creating a new paragraph
        return false;
      },
    };
  },
});

export default ClearMarksOnEnter;
