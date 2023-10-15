import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { useFilesStore } from "@/store/filesStore";
import { updateFile } from "@/functions/createUpdateFile";
import { getFileName } from "@/functions/getFileName";

import { useEditor, Menu, Editor, Extensions } from "@typethings/editor";

import PageNavbar from "@/components/pageNavbar";

import { cn, buttonVariants, TooltipStyles } from "@typethings/ui";

const ProseClasses = cn(
  "prose prose-quoteless prose-neutral dark:prose-invert",
  "prose-headings:text-2xl",
  "prose-line:leading-8",
  "focus:outline-none outline-none",
  "overflow-y-auto overflow-x-hidden mx-auto",
  "prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:overflow-y-hidden prose-pre:dark:bg-neutral-800/50 prose-pre:bg-neutral-200/50 prose-pre:font-mono prose-pre:text-neutral-900 prose-pre:dark:text-white prose-pre:border prose-pre:border-neutral-300 prose-pre:dark:border-neutral-800",
  "prose-code:font-mono",
  "prose-a:cursor-pointer prose-a:underline-offset-4",
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
    <Editor
      editor={editor}
      defaultValue={fileSelected.content}
      autoFocus={true}
      spellCheck={false}
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
            className:
              "p-1 dark:text-neutral-500 text-neutral-400 hover:bg-transparent dark:hover:bg-transparent",
          })}
          btnActiveClassName="text-dark dark:text-white"
          btnGroupClassName="flex items-center border-b border-neutral-300/50 dark:border-neutral-800 overflow-x-auto bg-neutral-100 dark:bg-neutral-900 w-full z-50 pb-2"
          btnGroupDividerClassName="flex items-center space-x-1 h-6 px-2"
          btnToolTipClassName={TooltipStyles}
          saveOnClickFn={handleSaveFile}
        />
      </PageNavbar>
    </Editor>
  );
};

export default EditorPage;
