import { exists, BaseDirectory } from "@tauri-apps/api/fs";

export const checkDirFile = async (path: string) => {
  try {
    return await exists(path, { dir: BaseDirectory.AppData });
  } catch (error) {
    return console.log(error);
  }
};
