import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iReadFilesFromFolder {
  directory: string;
  folder: string;
}

interface iReadFile {
  path: string;
}

export const readFilesFromFolder = async ({
  directory,
  folder,
}: iReadFilesFromFolder) => {
  const fullPath = await join(directory, folder);
  return await readDir(fullPath);
};

export const readFile = async ({ path }: iReadFile) => {
  return await readTextFile(path);
};
