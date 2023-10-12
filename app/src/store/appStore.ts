import { create } from "zustand";

interface iAppStore {
  openDrawer: boolean;
  toggleDrawer: () => void;
}

export const useAppStore = create<iAppStore>((set) => ({
  openDrawer: false,
  toggleDrawer: () => set((state) => ({ openDrawer: !state.openDrawer })),
}));
