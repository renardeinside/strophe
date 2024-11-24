import { EditorContent, Editor as TiptapEditor } from "@tiptap/react";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { loadExtensions } from "@/lib/extensions";
import { LoaderCircle } from "lucide-react";
import { useDoc } from "@/hooks/use-doc";
import * as Y from "yjs";

const EditorMenu = lazy(() => import("./EditorMenu"));

const Loading = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center h-96 items-center">
      <LoaderCircle className="animate-spin h-8 w-8" />
      <span>Loading</span>
    </div>
  );
};

const EditorView = ({ doc }: { doc: Y.Doc }) => {
  const editor = useMemo(
    () =>
      new TiptapEditor({
        extensions: [...loadExtensions(doc)],
        editorProps: {
          attributes: {
            class:
              "!w-full prose !max-w-none dark:prose-invert prose-md leading-tight focus:outline-none min-h-[90vh]",
          },
        },
      }),
    [doc]
  );

  useEffect(() => {
    if (!editor.isFocused) {
      editor.commands.focus("end");
    }
  }, [editor]);

  return (
    <div className="flex px-8 pt-4 justify-center">
      <EditorContent editor={editor} className="w-3/5" />
      <EditorMenu editor={editor} />
    </div>
  );
};

const Editor = () => {
  const doc = useDoc();

  return (
    <Suspense fallback={<Loading />}>
      <EditorView doc={doc} />
    </Suspense>
  );
};

export default Editor;
