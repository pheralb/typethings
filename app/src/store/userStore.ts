import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface iUserStore {
  user: string;
  setUser: (user: string) => void;
}

export const useUserStore = create<iUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: "",
        setUser: (user) => set({ user }),
      }),
      {
        name: "user-storage",
      },
    ),
  ),
);
