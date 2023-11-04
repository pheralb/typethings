import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";

export const createFolder = async (name: string) => {
  try {
    await createDir(name, { dir: BaseDirectory.Document, recursive: true });
    const getDocumentDir = await documentDir();
    const result = {
      success: true,
      directory: `${getDocumentDir}${name}`,
    };
    return result;
  } catch (error) {
    console.log(error);
  }
};
