import { writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iCreateNewFile {
  path: string;
  filename: string;
  extension: string;
  content: string;
}

interface iUpdateFile {
  path: string;
  content: string;
}

export const createFile = async ({
  path,
  filename,
  extension,
  content,
}: iCreateNewFile) => {
  const fullPath = await join(path, `${filename}.${extension}`);
  await writeTextFile(fullPath, content);
  return fullPath;
};

export const updateFile = async ({ path, content }: iUpdateFile) => {
  await writeTextFile(path, content);
  return path;
};
