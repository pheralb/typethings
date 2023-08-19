import { writeTextFile } from "@tauri-apps/api/fs";

interface iCreateNewFile {
  directory: string;
  folder: string;
  filename: string;
  extension: string;
  content: string;
}

export const createNewFile = async ({
  directory,
  folder,
  filename,
  extension,
  content,
}: iCreateNewFile) => {
  await writeTextFile(
    `${directory}/${folder}/${filename}.${extension}`,
    content,
  );
};
