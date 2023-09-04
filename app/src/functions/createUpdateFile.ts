import { writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iCreateNewFile {
  path: string;
  folder: string;
  filename: string;
  extension: string;
  content: string;
}

export const createUpdateFile = async ({
  path,
  folder,
  filename,
  extension,
  content,
}: iCreateNewFile) => {
  const fullPath = await join(path, folder, `${filename}.${extension}`);
  return await writeTextFile(fullPath, content);
};
