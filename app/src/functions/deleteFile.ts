import { removeFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iDeleteFile {
  directory: string;
  folder: string;
  filename: string;
  extension: string;
}

export const deleteFile = async ({
  directory,
  folder,
  filename,
  extension,
}: iDeleteFile) => {
  const fullPath = await join(directory, folder, `${filename}.${extension}`);
  return await removeFile(fullPath);
};
