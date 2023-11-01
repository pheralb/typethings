import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/store/workspaceStore";
import "@/styles/tiptap-code.css";

import { getFileNameWithoutExtension, updateFile } from "@typethings/functions";
import { useEditor, Menu, Editor, Extensions } from "@typethings/editor";

import PageNavbar from "@/components/pageNavbar";

import {
  cn,
  buttonVariants,
  TooltipStyles,
  ProseClasses,
} from "@typethings/ui";

const ProseStyle = cn(
  "focus:outline-none outline-none",
  "overflow-y-auto overflow-x-hidden mx-auto",
  ProseClasses,
);

const EditorPage = () => {
  const fileSelected = useWorkspaceStore((state) => state.selectedFile);
  const [text, setText] = useState<string | undefined>("");
  const editor = useEditor({
    extensions: Extensions,
    injectCSS: false,
    content: fileSelected?.content,
    onUpdate: ({ editor }) => {
      setText(editor.storage.markdown.getMarkdown());
    },
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class: ProseStyle,
      },
    },
  });

  useHotkeys("ctrl+s", () => handleSaveFile());

  useEffect(() => {
    if (!fileSelected) return;
    editor?.chain().focus().setContent(fileSelected.content).run();
    setText(fileSelected.content);
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
      <PageNavbar
        title={getFileNameWithoutExtension(fileSelected.path)!}
        close={true}
      >
        <Menu
          editor={editor}
          btnClassName={buttonVariants({
            variant: "ghost",
            className:
              "p-1 text-neutral-500/80 dark:text-neutral-500/80 hover:bg-transparent dark:hover:bg-transparent",
          })}
          btnActiveClassName="text-dark dark:text-white"
          btnGroupClassName="flex items-center border-b border-neutral-300/50 dark:border-neutral-800 overflow-x-auto bg-neutral-100 dark:bg-neutral-900 w-full z-50 pb-2"
          btnGroupDividerClassName="flex items-center space-x-1 h-6 px-2 first:border-none border-l border-neutral-300/50 dark:border-neutral-800"
          btnToolTipClassName={TooltipStyles}
          saveOnClickFn={handleSaveFile}
        />
      </PageNavbar>
    </Editor>
  );
};

export default EditorPage;
