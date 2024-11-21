import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { createLowlight, common } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { nodePasteRule, type PasteRuleFinder } from "@tiptap/core";

export const loadExtensions = () => {
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
    StarterKit.configure({
      codeBlock: false,
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
  ];

  return extensions;
};