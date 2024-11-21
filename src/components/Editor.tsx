import { EditorContent, useEditor } from "@tiptap/react";
import { useAtom } from "jotai";
import { $storage, contentAtom } from "@/lib/stores";

import { lazy, useEffect } from "react";
import { toast } from "sonner"
import { loadExtensions } from "@/lib/extensions";


const EditorMenu = lazy(() => import("./EditorMenu"));

const Editor = () => {
  const [content, setContent] = useAtom(contentAtom);

  const safeParse = (value: string | null) => {
    try {
      return value ? JSON.parse(value) : "";
    } catch (e) {
      toast.error(`Failed to parse content due to ${e}`);
      return "";
    }
  };

  const editor = useEditor({
    extensions: loadExtensions(),
    content: safeParse(content),
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
    const unsubscribe = $storage.subscribe!(
      "st-content",
      (value) => {
        if (editor) {
          editor.commands.setContent(value ? JSON.parse(value) : "");
        }
      },
      null
    );

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
