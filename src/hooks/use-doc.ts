import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { useEffect } from "react";

export const getSyncedDoc = () => {
  let status = "pending";
  const doc = new Y.Doc();
  const persistence = new IndexeddbPersistence("st-content", doc);

  const suspender = new Promise((resolve, reject) => {
    persistence.whenSynced
      .then(() => {
        status = "success";
        resolve({ doc });
      })
      .catch((error) => {
        status = "error";
        reject(error);
      });
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw new Error("Persistence error");
      } else {
        return doc;
      }
    },
  };
};

export const docResource = getSyncedDoc();

export const useDoc = () => {
  const doc = docResource.read();

  useEffect(() => {
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
  }, [doc]);

  return doc;
};
