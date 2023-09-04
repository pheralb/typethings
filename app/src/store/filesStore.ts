import type { FileEntry } from "@tauri-apps/api/fs";
import { create } from "zustand";

interface SelectFile {
  name: string;
  path: string;
  content: string;
}

interface iFilesStore {
  files: FileEntry[];
  selectedFile: SelectFile | null;
  setSelectedFile: ({ name, path, content }: SelectFile) => void | null;
  saveFilesToStore: (files: FileEntry[]) => void;
  addFile: (file: FileEntry) => void;
  removeFile: (filename: string) => void;
}

export const useFilesStore = create<iFilesStore>((set) => ({
  files: [],
  selectedFile: null,
  setSelectedFile: (file) =>
    set({
      selectedFile: {
        name: file.name,
        path: file.path,
        content: file.content,
      },
    }),
  saveFilesToStore: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (filename) =>
    set((state) => ({ files: state.files.filter((file) => file.name !== filename) })),
}));
