import { open } from "@tauri-apps/api/dialog";
import { getFolderName } from "./getFolderName";

export const selectFolder = async () => {
  const selectedFolder = await open({
    multiple: false,
    directory: true,
    title: "Open Folder",
  });
  if (!selectedFolder) return;
  const folderPath = selectedFolder.toString();
  const folderName = getFolderName(folderPath);
  return {
    folderPath,
    folderName,
  } as {
    folderPath: string;
    folderName: string;
  };
};
