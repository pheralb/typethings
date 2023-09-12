import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface workspace {
  folderName: string;
  folderPath: string;
  createdAt: Date;
}

interface iWorkspaceStore {
  workspaces: workspace[];
  selectedWorkspace: workspace | null;
  selectWorkspace: (folderPath: string) => void;
  addWorkspace: (workspace: workspace) => void;
  deleteWorkspace: (folderPath: string) => void;
}

export const useWorkspaceStore = create<iWorkspaceStore>()(
  devtools(
    persist(
      (set) => ({
        workspaces: [],
        selectedWorkspace: null,
        selectWorkspace: (folderPath) =>
          set((state) => ({
            ...state,
            selectedWorkspace: state.workspaces.find(
              (w) => w.folderPath === folderPath,
            ),
          })),
        addWorkspace: (workspace) =>
          set((state) => ({
            ...state,
            workspaces: [...state.workspaces, workspace],
          })),
        deleteWorkspace: (folderPath) =>
          set((state) => ({
            ...state,
            workspaces: state.workspaces.filter(
              (w) => w.folderPath !== folderPath,
            ),
          })),
      }),
      {
        name: "workspace-store",
      },
    ),
  ),
);
