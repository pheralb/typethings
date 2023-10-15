import { useEffect, useState } from "react";
import { readFilesFromFolder } from "@/functions/readFiles";
import { FileEntry } from "@tauri-apps/api/fs";
import FileItem from "./fileItem";
import { useFilesStore } from "@/store/filesStore";

interface iFileListProps {
  directory: string;
  folder: string;
}

const FileList = (props: iFileListProps) => {
  const setFiles = useFilesStore((state) => state.setFiles);
  const getFiles = useFilesStore((state) => state.files);

  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const result = await readFilesFromFolder({
        path: props.directory,
      });
      const onlyMdFiles = result.filter((file) => file.name!.endsWith("md"));
      setFiles(onlyMdFiles);
    }
    loadFiles();
  }, []);

  return (
    <div className="flex flex-col space-y-0">
      {getFiles.length > 0 ? (
        getFiles.map((file) => (
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
