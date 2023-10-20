import { useEffect, useState } from "react";

import { readFilesFromFolder } from "@typethings/functions";
import type { FileEntry } from "@typethings/functions";

import FileItem from "./fileItem";

interface iFileListProps {
  directory: string;
  folder: string;
}

const FileList = (props: iFileListProps) => {
  const [files, setFiles] = useState<FileEntry[]>([]);

  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const result = await readFilesFromFolder({
        path: props.directory,
      });
      setFiles(result!);
    }
    loadFiles();
  }, []);

  return (
    <div className="flex flex-col space-y-0">
      {files.length > 0 ? (
        files.map((file) => (
          <FileItem key={file.name} name={file.name!} path={file.path!} />
        ))
      ) : (
        <div className="flex flex-col justify-start text-neutral-400">
          <p className="text-sm">No files found.</p>
        </div>
      )}
    </div>
  );
};

export default FileList;
