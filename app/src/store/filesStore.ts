import { create } from "zustand";

type iSelectedFile = {
  filename: string;
  extension: string;
  content?: string;
};

interface iFilesStore {
  files: string[];
  selectedFile: iSelectedFile | null;
  setSelectedFile: ({ filename, extension, content }: iSelectedFile) => void | null;
  saveFilesToStore: (files: string[]) => void;
  addFile: (file: string) => void;
  removeFile: (filename: string) => void;
}

export const useFilesStore = create<iFilesStore>((set) => ({
  files: [],
  selectedFile: null,
  setSelectedFile: (file) =>
    set({
      selectedFile: {
        filename: file.filename,
        extension: file.extension,
        content: file.content,
      },
    }),
  saveFilesToStore: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (filename) =>
    set((state) => ({ files: state.files.filter((f) => f !== filename) })),
}));
