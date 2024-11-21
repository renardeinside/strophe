import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { createLowlight, common } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { useAtom } from "jotai";
import { $storage, contentAtom } from "@/lib/stores";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { nodePasteRule, type PasteRuleFinder } from "@tiptap/core";
import EditorMenu from "./EditorMenu";
import { useEffect } from "react";

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

const lowlight = createLowlight(common);

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

  const editor = useEditor({
    extensions,
    content: content ? JSON.parse(content) : "",
    onUpdate: ({ editor }) => {
      setContent(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class:
          "!w-full prose !max-w-none dark:prose-invert sm:prose-sm md:prose-md focus:outline-none min-h-[90vh]",
      },
    },
  });

  useEffect(() => {
    const unsubscribe = $storage.subscribe!('st-content', (value) => {
      if (editor) {
        editor.commands.setContent(value ? JSON.parse(value) : "");
      }
    }, null);

    return () => {
      unsubscribe();
    };
  }, [editor]);


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
