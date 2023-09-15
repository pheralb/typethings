import { useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";
import { readFilesFromFolder } from "@/functions/readFiles";
import { FileEntry } from "@tauri-apps/api/fs";

import FileItem from "./fileItem";

const FileList = () => {
  const [result, setResult] = useState<FileEntry[]>([]);

  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readFilesFromFolder({
        directory: desktopPath,
        folder: "taurifiles",
      });
      setResult(result);
    }
    loadFiles();
  }, []);

  return (
    <div className="flex flex-col space-y-0">
      {result.map((file) => (
        <FileItem key={file.name} name={file.name} path={file.path} />
      ))}
    </div>
  );
};

export default FileList;
