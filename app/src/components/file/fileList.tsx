import { desktopDir } from "@tauri-apps/api/path";
import { useEffect } from "react";
import { readFiles } from "@/functions/readFiles";

const FileList = () => {
  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readFiles({
        directory: desktopPath,
        folder: "taurifiles",
      });
      console.log(result);
    }
    loadFiles();
  }, []);

  return <div>FileList</div>;
};

export default FileList;
