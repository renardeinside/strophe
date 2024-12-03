import { useEffect, useMemo } from "react";
import * as Y from "yjs";

export const usePosition = (doc: Y.Doc) => {
  const position = useMemo(() => {
    const position: Y.Map<number | null> = doc.getMap("position");
    return position;
  }, [doc]);

  useEffect(() => {
    // scroll to the last known scroll position softly
    const scroll = position.get("scroll");
    if (scroll) {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [position]);

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
