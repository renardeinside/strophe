import { EditorContent, useEditor } from "@tiptap/react";
import { lazy, useEffect } from "react";
import { loadExtensions } from "@/lib/extensions";
import { LoaderCircle } from "lucide-react";
import { useYDoc } from "@/hooks/use-doc";

const EditorMenu = lazy(() => import("./EditorMenu"));

const Loading = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center h-96 items-center">
      <LoaderCircle className="animate-spin h-8 w-8" />
      <span>Loading</span>
    </div>
  );
};

const Editor = () => {
  const { doc, loaded } = useYDoc();

  const editor = useEditor({
    extensions: [...loadExtensions(doc)],
    editorProps: {
      attributes: {
        class:
          "!w-full prose !max-w-none dark:prose-invert prose-md leading-tight focus:outline-none min-h-[90vh]",
      },
    },
  });

  useEffect(() => {
    if (loaded && editor) {
      editor.commands.focus("end");
    }
  }, [loaded, editor]);
  
  return (
    <>
      {loaded ? (
        editor && (
          <div className="flex px-8 pt-4 justify-center">
            <EditorContent editor={editor} className="w-3/5" />
            <EditorMenu editor={editor} />
          </div>
        )
      ) :<Loading />}
    </>
  );
};

export default Editor;
