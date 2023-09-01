import { SetStateAction, useEffect, useState } from "react";
import { useFilesStore } from "@/store/filesStore";
import { desktopDir } from "@tauri-apps/api/path";
import { createUpdateFile } from "@/functions/createUpdateFile";

import { MenuEditor, TiptapEditor } from "@typethings/editor";
import PageNavbar from "@/components/pageNavbar";
import { buttonVariants } from "@/components/ui/button";

const Editor = () => {
  const fileSelected = useFilesStore((state) => state.selectedFile);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!fileSelected) return;

    const saveFile = setTimeout(async () => {
      try {
        const desktopPath = await desktopDir();
        await createUpdateFile({
          directory: desktopPath,
          folder: "taurifiles",
          filename: fileSelected.filename,
          extension: fileSelected.extension,
          content: text!,
        });
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearTimeout(saveFile);
  }, [text]);

  if (!fileSelected) return null;

  return (
    <TiptapEditor
      slotBefore={
        <PageNavbar title={fileSelected.filename}>
          <MenuEditor
            btnClassName={buttonVariants({
              variant: "ghost",
              className: "p-2 text-neutral-500 hover:bg-transparent",
            })}
            btnActiveClassName="text-white"
            btnGroupClassName="flex items-center space-x-1 border-b border-neutral-800 pl-3 overflow-x-auto bg-neutral-900 w-full z-50"
          />
        </PageNavbar>
      }
      editorClassName="prose dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none"
      content={fileSelected.content}
      onUpdate={(content: {
        editor: { getText: () => SetStateAction<string | undefined> };
      }) => setText(content.editor.getText())}
    >
      <p>other menu</p>
    </TiptapEditor>
  );
};

export default Editor;

// Ver. with Monaco Editor (only if Tiptap doesn't work well)
// <Editor
//   language={
//     fileExtensions.find(
//       (file) => file.extension === fileSelected.extension,
//     )?.name ?? "plaintext"
//   }
//   onChange={(value) => setText(value)}
//   value={fileSelected.content}
// />
