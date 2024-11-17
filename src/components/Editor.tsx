import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { useAtom } from "jotai";
import { contentAtom, cursorPositionAtom } from "@/lib/stores";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { nodePasteRule, type PasteRuleFinder } from "@tiptap/core";
import EditorMenu from "./EditorMenu";

const ImageFinder: PasteRuleFinder = /data:image\//g;

const ImageExtended = Image.extend({
  name: "ImageExtended",
  addPasteRules() {
    return [
      nodePasteRule({
        find: ImageFinder,
        type: this.type,
        getAttributes(match) {
          if (match.input) {
            return {
              src: match.input,
            };
          }
        },
      }),
    ];
  },
});

const lowlight = createLowlight(all);

// define your extension array
const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Placeholder.configure({ placeholder: "Start typing..." }),
  Link.configure({ openOnClick: true, autolink: true }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  ImageExtended,
];

const Editor = () => {
  const [content, setContent] = useAtom(contentAtom);
  const [cursorPosition, setCursorPosition] = useAtom(cursorPositionAtom);

  const editor = useEditor({
    extensions,
    content: content,
    onTransaction: ({ editor }) => {
      setCursorPosition(`${editor.state.selection.from}`); // yes, this is hacky
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      const setPos = cursorPosition ? parseInt(cursorPosition) : 5;
      editor.chain().focus().setTextSelection(setPos).run();
    },
    editorProps: {
      attributes: {
        class:
          "!w-full prose !max-w-none dark:prose-invert sm:prose-sm md:prose-md focus:outline-none min-h-[90vh]",
      },
    },
  });

  return (
    <>
      {editor && (
        <div className="flex px-8 pt-4 justify-center">
          <EditorContent editor={editor} className="w-4/5" />
          <EditorMenu editor={editor} />
        </div>
      )}
    </>
  );
};

export default Editor;
