import { open } from "@tauri-apps/api/dialog";
import { dirname } from "@tauri-apps/api/path";
import { getFolderName } from "./getFolderName";

export const openFile = async () => {
  const selectedFile = await open({
    multiple: false,
    title: "Open File",
    filters: [
      {
        name: "Markdown Files",
        extensions: ["md"],
      },
    ],
  });
  if (!selectedFile) return;
  const folderPath = await dirname(selectedFile.toString());
  const folderName = getFolderName(folderPath);
  return {
    selectedFile,
    folderPath,
    folderName,
  } as {
    selectedFile: string;
    folderPath: string;
    folderName: string;
  };
};
