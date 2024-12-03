import { EditorContent, Editor as TiptapEditor } from "@tiptap/react";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { loadExtensions } from "@/lib/extensions";
import { LoaderCircle } from "lucide-react";
import { dbExistsResource, useDoc } from "@/hooks/use-doc";
import * as Y from "yjs";
import { toast } from "sonner";
import { usePosition } from "@/hooks/use-position";

const EditorMenu = lazy(() => import("./EditorMenu"));

const Loading = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center h-96 items-center">
      <LoaderCircle className="animate-spin h-8 w-8" />
      <span>Loading</span>
    </div>
  );
};

const EditorView = ({ doc, firstLoad }: { doc: Y.Doc; firstLoad: boolean }) => {
  const editor = useMemo(() => {
    const editor = new TiptapEditor({
      autofocus: true,
      extensions: [...loadExtensions(doc)],
      editorProps: {
        attributes: {
          class:
            "!w-full prose !max-w-none dark:prose-invert prose-md leading-tight focus:outline-none min-h-[60vh]",
        },
      },
    });
    if (firstLoad) {
      editor.chain().setContent("<p></p>".repeat(10)).focus("end").run();
    }
    return editor;
  }, [doc, firstLoad]);

  usePosition(doc, editor);

  return (
    <>
      <div className="flex flex-col px-8 pt-4 justify-center items-center">
        <EditorContent
          editor={editor}
          className="w-5/6 max-w-screen-xl flex-1"
        />
        <div className="h-32 w-full" onClick={() => {
          // Focus the editor at the end when clicking on the empty space
          editor.commands.focus("end");
        }}></div>
      </div>
      <EditorMenu editor={editor} />
    </>
  );
};

export const Editor = () => {
  const dbExists = dbExistsResource.read();
  const doc = useDoc();

  useEffect(() => {
    if (!dbExists) {
      // Display welcome toast
      const timer = setTimeout(() => {
        toast(
          <span>✨ Welcome to Strophe. Add some sparkle to your notes.</span>
        );
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [dbExists, doc]);

  return (
    <Suspense fallback={<Loading />}>
      <EditorView doc={doc} firstLoad={!dbExists} />
    </Suspense>
  );
};

export default Editor;
