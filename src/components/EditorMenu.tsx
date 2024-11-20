import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Edit3,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Editor } from "@tiptap/core";
import LinkInput from "./LinkInput";

export default function EditorMenu({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLinkInput, setOpenLinkInput] = useState(false);

  const formatOptions = [
    {
      icon: Bold,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      variant: editor.isActive("bold") ? "default" : "ghost",
    },
    {
      icon: Italic,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      variant: editor.isActive("italic") ? "default" : "ghost",
    },
    {
      icon: Strikethrough,
      title: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      variant: editor.isActive("strike") ? "default" : "ghost",
    },
    {
      icon: Underline,
      title: "Underline",
      // @ts-expect-error - underline is not in the core
      action: () => editor.chain().focus().toggleUnderline().run(),
      variant: editor.isActive("underline") ? "default" : "ghost",
    },
    {
      icon: Link,
      title: "Link",
      action: () => setOpenLinkInput(true),
      variant: editor.isActive("link") ? "default" : "ghost",
    },
  ];

  return (
    <>
      {openLinkInput && (
        <LinkInput setIsOpen={setOpenLinkInput} editor={editor} />
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-sm shadow-lg text-primary border-primary"
            >
              <Edit3 className="h-6 w-6" />
              <span className="sr-only">Open text formatter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-12 min-w-0 bg-background rounded-sm shadow-xl"
          >
            {formatOptions.map((option) => (
              <DropdownMenuItem key={option.title} asChild>
                <Button
                  // @ts-expect-error - string doesn't match enum
                  variant={option.variant}
                  size="icon"
                  className="h-10 w-10 rounded-sm"
                  title={option.title}
                  onClick={option.action}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="sr-only">{option.title}</span>
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
