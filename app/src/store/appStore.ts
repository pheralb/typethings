import { create } from "zustand";

interface iAppStore {
  openDrawer: boolean;
  toggleDrawer: () => void;
}

export const useAppStore = create<iAppStore>((set) => ({
  openDrawer: true,
  toggleDrawer: () => set((state) => ({ openDrawer: !state.openDrawer })),
}));
