import { FileEntry, readDir, readTextFile } from "@tauri-apps/api/fs";

interface iReadFile {
  path: string;
}

export const readFilesFromFolder = async ({ path }: iReadFile) => {
  try {
    const result = await readDir(path);
    const onlyMdFiles = result.filter((file) => file.name!.endsWith("md"));
    return onlyMdFiles as FileEntry[];
  } catch (error) {}
};

export const readFile = async ({ path }: iReadFile) => {
  return await readTextFile(path);
};
