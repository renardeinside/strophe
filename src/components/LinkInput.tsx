import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Editor } from "@tiptap/core";

const formSchema = z.object({
  link: z.string().url("Please enter a valid URL").or(z.literal("")),
  text: z.string().min(1, "Please enter a valid text"),
});

type FormData = z.infer<typeof formSchema>;

const getSelectedText = (editor: Editor) => {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to);
  return text;
};

export default function LinkInput({
  setIsOpen,
  editor,
}: {
  setIsOpen: (open: boolean) => void;
  editor: Editor;
}) {
  const initialLink = editor.isActive("link")
    ? editor.getAttributes("link").href
    : "";
  const initialText = getSelectedText(editor);
  const [formData, setFormData] = useState<FormData>({
    link: initialLink,
    text: initialText,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = formSchema.parse(formData);
      setIsOpen(false);
      setFormData({ link: "", text: "" });
      setErrors({});

      if (!validatedData.link) {
        editor.chain().focus().unsetLink().run();
        toast.success("Link removed successfully");
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: validatedData.link })
          .insertContentAt(
            {
              from: editor.state.selection.from,
              to: editor.state.selection.to,
            },
            validatedData.text
          )
          .run();

        toast.success("Link added successfully");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Enter Link Details</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          onReset={() => {
            editor.chain().focus().unsetLink().run();
            setIsOpen(false);
            toast.success("Link removed successfully");
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <div className="col-span-3">
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={errors.link ? "border-red-500" : ""}
                placeholder="https://example.com"
              />
              {errors.link && (
                <p className="text-xs text-red-500 mt-1">{errors.link}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
              Text
            </Label>
            <div className="col-span-3">
              <Input
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                className={errors.text ? "border-red-500" : ""}
                placeholder="Link description"
              />
              {errors.text && (
                <p className="text-xs text-red-500 mt-1">{errors.text}</p>
              )}
            </div>
          </div>
          <div className="ml-auto space-x-2">
            <Button type="submit" variant={"outline"}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
