import { useEffect, useState } from "react";
import { readFilesFromFolder } from "@/functions/readFiles";
import { FileEntry } from "@tauri-apps/api/fs";

import FileItem from "./fileItem";

interface iFileListProps {
  directory: string;
  folder: string;
}

const FileList = (props: iFileListProps) => {
  const [result, setResult] = useState<FileEntry[]>([]);

  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const result = await readFilesFromFolder({
        path: props.directory,
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
