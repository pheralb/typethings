import { useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";

import { useFilesStore } from "@/store/filesStore";
import Editor from "../components/editor";
import { createUpdateFile } from "@/functions/createUpdateFile";

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
          content: text ?? "",
        });
      } catch (error) {
        console.error(error);
      }
      setIsSaved(true);
    }, 1000);

    return () => clearTimeout(saveFile);
  }, [text]);

  return (
    <>
      {fileSelected ? (
        <Editor
          language={fileSelected.extension}
          onChange={(value) => setText(value)}
          value={fileSelected.content}
        />
      ) : (
        <div className="flex h-screen items-center justify-center">
          No file selected
        </div>
      )}
    </>
  );
}

export default App;
