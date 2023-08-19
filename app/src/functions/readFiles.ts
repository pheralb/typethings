import { readDir } from "@tauri-apps/api/fs";

interface iReadFiles {
  directory: string;
  folder: string;
}

export const readFilesFromFolder = async ({ directory, folder }: iReadFiles) => {
  return await readDir(`${directory}/${folder}`);
};
