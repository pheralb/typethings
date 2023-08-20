import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iReadFilesFromFolder {
  directory: string;
  folder: string;
}

interface iReadFile {
  directory: string;
  folder: string;
  filename: string;
  extension: string;
}

export const readFilesFromFolder = async ({
  directory,
  folder,
}: iReadFilesFromFolder) => {
  const fullPath = await join(directory, folder);
  return await readDir(fullPath);
};

export const readFile = async ({
  directory,
  folder,
  filename,
  extension,
}: iReadFile) => {
  const fullPath = await join(directory, folder, `${filename}.${extension}`);
  return await readTextFile(fullPath);
};
