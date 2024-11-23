import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Editor } from "@tiptap/core";
import LinkInput from "./LinkInput";
import { Separator } from "@/components/ui/separator";

export default function EditorMenu({ editor }: { editor: Editor }) {
  const [openLinkInput, setOpenLinkInput] = useState(false);

  const alignOptions = [
    {
      icon: AlignLeft,
      title: "Align Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: AlignCenter,
      title: "Align Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: AlignRight,
      title: "Align Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: AlignJustify,
      title: "Align Justify",
      action: () => editor.chain().focus().setTextAlign("justify").run(),
    },
  ];

  const formatOptions = [
    {
      icon: Bold,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Strikethrough,
      title: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Underline,
      title: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: Link,
      title: "Link",
      action: () => setOpenLinkInput(true),
    },
  ];

  return (
    <>
      {openLinkInput && (
        <LinkInput setIsOpen={setOpenLinkInput} editor={editor} />
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col">
          {alignOptions.map((option) => (
            <Button
              key={option.title}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-sm"
              title={option.title}
              onClick={option.action}
            >
              <option.icon className="h-4 w-4" />
              <span className="sr-only">{option.title}</span>
            </Button>
          ))}
          <Separator />
          {formatOptions.map((option) => (
            <Button
              key={option.title}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-sm"
              title={option.title}
              onClick={option.action}
            >
              <option.icon className="h-4 w-4" />
              <span className="sr-only">{option.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
