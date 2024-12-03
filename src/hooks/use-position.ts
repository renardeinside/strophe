import { Editor } from "@tiptap/core";
import { useEffect, useMemo } from "react";
import * as Y from "yjs";

export const usePosition = (doc: Y.Doc, editor: Editor) => {
  const position = useMemo(() => {
    const position: Y.Map<number | null> = doc.getMap("position");
    return position;
  }, [doc]);

  editor.on("selectionUpdate", () => {
    const { from, to } = editor.state.selection;
    if (from == to) {
      position.set("from", from);
    }
  });

  useEffect(() => {
    if (!editor.isFocused) {
      if (position.has("from") && position.has("to")) {
        // do nothing
      } else {
        position.set("from", 0);
      }

      editor.commands.focus(position.get("from"), { scrollIntoView: false });

      // scroll to the last known scroll position softly
      const scroll = position.get("scroll");
      if (scroll) {
        window.scrollTo({ top: scroll, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [editor, doc, position]);

  useEffect(() => {
    const handleScroll = () => {
      position.set("scroll", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);
};
