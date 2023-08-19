import { create } from "zustand";

interface iFilesStore {
  files: string[];
  saveFilesToStore: (files: string[]) => void;
  addFile: (file: string) => void;
}

export const useFilesStore = create<iFilesStore>((set) => ({
  files: [],
  saveFilesToStore: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
}));
