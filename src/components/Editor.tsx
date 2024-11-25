import { EditorContent, Editor as TiptapEditor } from "@tiptap/react";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { loadExtensions } from "@/lib/extensions";
import { LoaderCircle } from "lucide-react";
import { dbExistsResource, useDoc } from "@/hooks/use-doc";
import * as Y from "yjs";
import { toast } from "sonner";

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
            "!w-full prose !max-w-none dark:prose-invert prose-md leading-tight focus:outline-none min-h-[90vh]",
        },
      },
    });
    if (firstLoad) {
      editor.chain().setContent("<p></p>".repeat(10)).focus("end").run();
    }
    return editor;
  }, [doc, firstLoad]);

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

export const Editor = () => {
  const dbExists = dbExistsResource.read();
  const doc = useDoc();

  useEffect(() => {
    if (!dbExists) {
      // Display welcome toast
      const timer = setTimeout(() => {
        toast(<span>✨ Welcome to Strophe. Add some sparkle to your notes.</span>);
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
