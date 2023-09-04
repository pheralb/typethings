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
      saveFilesToStore(result);
      console.log(result);
    }
    loadFiles();
  }, []);

  return (
    <div className="flex flex-col space-y-0">
      {files.map((file) => (
        <FileItem
          key={file.name}
          name={file.name}
          path={file.path}
        />
      ))}
    </div>
  );
};

export default FileList;
