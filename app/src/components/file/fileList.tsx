import { useEffect } from "react";
import { desktopDir } from "@tauri-apps/api/path";
import { readFilesFromFolder } from "@/functions/readFiles";
import { useFilesStore } from "@/store/filesStore";
import FileItem from "./fileItem";

const FileList = () => {
  const saveFilesToStore = useFilesStore((state) => state.saveFilesToStore);
  const files = useFilesStore((state) => state.files);

  // Read files from directory:
  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readFilesFromFolder({
        directory: desktopPath,
        folder: "taurifiles",
      });
      const filesnames = result.map((file) => file.name!);
      console.log(filesnames);
      saveFilesToStore(filesnames);
    }
    loadFiles();
  }, []);

  return (
    <>
      {files.map((file) => (
        <FileItem
          key={file}
          filename={file.split(".")[0]}
          extension={file.split(".")[1]}
        />
      ))}
    </>
  );
};

export default FileList;
