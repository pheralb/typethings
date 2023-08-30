import { SetStateAction, useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";

import { useFilesStore } from "@/store/filesStore";
import { MenuEditor, TiptapEditor } from "@typethings/editor";
import { createUpdateFile } from "@/functions/createUpdateFile";
import { buttonVariants } from "@/components/ui/button";

function App() {
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

  return (
    <>
      {fileSelected ? (
        <TiptapEditor
          slotBefore={
            <MenuEditor
              btnClassName={buttonVariants({
                variant: "ghost",
              })}
              btnActiveClassName="text-red-500"
            />
          }
          editorClassName="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none"
          content={fileSelected.content}
          onUpdate={(content: {
            editor: { getText: () => SetStateAction<string | undefined> };
          }) => setText(content.editor.getText())}
        >
          <p>other menu</p>
        </TiptapEditor>
      ) : (
        // <Editor
        //   language={
        //     fileExtensions.find(
        //       (file) => file.extension === fileSelected.extension,
        //     )?.name ?? "plaintext"
        //   }
        //   onChange={(value) => setText(value)}
        //   value={fileSelected.content}
        // />
        <div className="flex h-screen items-center justify-center">
          No file selected
        </div>
      )}
    </>
  );
}

export default App;
