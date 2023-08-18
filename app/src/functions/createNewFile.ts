import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

interface iCreateNewFile {
  folder: string;
  filename: string;
  extension: string;
  content: string;
}

export const createNewFile = async ({
  folder,
  filename,
  extension,
  content,
}: iCreateNewFile) => {
  const desktopPath = await desktopDir();
  await writeTextFile(
    `${desktopPath}/${folder}/${filename}.${extension}`,
    content,
  );
};
