import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { useFilesStore } from "@/store/filesStore";
import { updateFile } from "@/functions/createUpdateFile";
import { getFileName } from "@/functions/getFileName";

import { useEditor, Menu, Editor, Extensions } from "@typethings/editor";

import PageNavbar from "@/components/pageNavbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const ProseClasses = cn(
  "prose prose-quoteless prose-neutral dark:prose-invert",
  "prose-headings:text-2xl",
  "prose-line:leading-8",
  "focus:outline-none outline-none",
  "overflow-y-auto overflow-x-hidden mx-auto",
);

const EditorPage = () => {
  const fileSelected = useFilesStore((state) => state.selectedFile);
  const [text, setText] = useState<string | undefined>("");
  const editor = useEditor({
    extensions: Extensions,
    content: fileSelected?.content,
    onUpdate: ({ editor }) => {
      setText(editor.storage.markdown.getMarkdown());
    },
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class: ProseClasses,
      },
    },
  });
  useHotkeys("ctrl+s", () => handleSaveFile);

  useEffect(() => {
    if (!fileSelected) return;
    editor?.chain().focus().setContent(fileSelected.content).run();
  }, [fileSelected]);

  if (!fileSelected) return null;

  const handleSaveFile = async () => {
    try {
      await updateFile({
        path: fileSelected.path,
        content: text!,
      });
      toast.success("File saved!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Editor
        editor={editor}
        defaultValue={fileSelected.content}
        autoFocus={true}
        editorContentClassName="p-4"
        onUpdate={({ editor }) => {
          setText(editor.storage.markdown.getMarkdown());
        }}
      >
        <PageNavbar title={getFileName(fileSelected.path)!}>
          <Menu
            editor={editor}
            btnClassName={buttonVariants({
              variant: "ghost",
              className: "p-2 text-neutral-500 hover:bg-transparent",
            })}
            btnActiveClassName="text-white"
            btnGroupClassName="flex items-center space-x-1 border-b border-neutral-800 pl-3 overflow-x-auto bg-neutral-900 w-full z-50"
          />
        </PageNavbar>
      </Editor>
    </>
  );
};

export default EditorPage;
