import { Editor, Extension } from "@tiptap/core";
import { yUndoPluginKey } from "y-prosemirror";
import { UndoManager } from "yjs";

const commitUndo = (editor: Editor) => {
  const state = editor.state;
  const undoManager: UndoManager = yUndoPluginKey.getState(state).undoManager;
  undoManager.stopCapturing();
};

export const CommitUndo = Extension.create({
  name: "commitOnEnter",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        commitUndo(editor);
        return false;
      },
      Space: ({ editor }) => {
        commitUndo(editor);
        return false;
      },
    };
  },
});
