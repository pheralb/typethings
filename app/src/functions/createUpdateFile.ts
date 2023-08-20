import { writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

interface iCreateNewFile {
  directory: string;
  folder: string;
  filename: string;
  extension: string;
  content: string;
}

export const createUpdateFile = async ({
  directory,
  folder,
  filename,
  extension,
  content,
}: iCreateNewFile) => {
  const fullPath = await join(directory, folder, `${filename}.${extension}`);
  return await writeTextFile(fullPath, content);
};
