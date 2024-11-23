import { useEffect, useState } from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

export const useYDoc = () => {
  const [doc] = useState(() => new Y.Doc());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const persistence = new IndexeddbPersistence("st-content", doc);
    const channel = new BroadcastChannel("st-channel-sync");

    // Listen for updates from other tabs
    channel.onmessage = (event) => {
      if (event.data && event.data.type === "sync-update") {
        Y.applyUpdate(doc, event.data.update);
      }
    };

    // Broadcast updates to other tabs
    doc.on("update", (update) => {
      channel.postMessage({
        type: "sync-update",
        update,
      });
    });

    // Wait for data to be loaded
    persistence.whenSynced.then(() => {
      setLoaded(true);
    });

    // Cleanup on unmount
    return () => {
      channel.close();
      doc.destroy();
    };
  }, [doc]);

  return { doc, loaded };
};
