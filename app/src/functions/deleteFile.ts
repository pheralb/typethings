import { removeFile } from "@tauri-apps/api/fs";

interface iDeleteFile {
  path: string;
}

export const deleteFile = async ({ path }: iDeleteFile) => {
  return await removeFile(path);
};
