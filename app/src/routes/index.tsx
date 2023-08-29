import { useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";

import { useFilesStore } from "@/store/filesStore";
import { Editor } from "@typethings/editor";
import { createUpdateFile } from "@/functions/createUpdateFile";
import { fileExtensions } from "@/data/fileExtensions";

function App() {
  const fileSelected = useFilesStore((state) => state.selectedFile);
  const [text, setText] = useState<string | undefined>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

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
        setIsSaved(true);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearTimeout(saveFile);
  }, [text]);

  return (
    <>
      {fileSelected ? (
        <Editor />
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
