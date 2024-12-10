import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { createLowlight, common } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { nodePasteRule, type PasteRuleFinder } from "@tiptap/core";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { CommitUndo } from "./CommitUndo";
import ClearMarksOnEnter from "./ClearMarksOnEnter";
import {Typography} from "@tiptap/extension-typography";

export const loadExtensions = (doc: Y.Doc) => {
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
    Underline,
    StarterKit.configure({
      codeBlock: false,
      history: false,
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
    // although we don't really use collaboration, it's just for Yjs to work
    Collaboration.configure({
      document: doc, // Configure Y.Doc for collaboration
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Typography,
    CommitUndo,
    ClearMarksOnEnter,
  ];

  return extensions;
};
