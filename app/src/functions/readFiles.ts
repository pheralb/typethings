import { readDir, readTextFile } from "@tauri-apps/api/fs";

interface iReadFile {
  path: string;
}

export const readFilesFromFolder = async ({ path }: iReadFile) => {
  return await readDir(path);
};

export const readFile = async ({ path }: iReadFile) => {
  return await readTextFile(path);
};
