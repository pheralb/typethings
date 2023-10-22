import { FileEntry } from "@typethings/functions";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface workspace {
  folderName: string;
  folderPath: string;
  files: FileEntry[];
  createdAt: Date;
}

interface SelectFile {
  path: string;
  content: string;
}

interface iWorkspaceStore {
  workspaces: workspace[];
  selectedWorkspace: workspace | null;
  selectWorkspace: (folderPath: string | null) => void;
  addWorkspace: (workspace: workspace) => void;
  deleteWorkspace: (folderPath: string) => void;
  selectedFile: SelectFile | null;
  setSelectedFile: ({ path, content }: SelectFile) => void | null;
  addFileToWorkspace: (folderPath: string, file: FileEntry) => void;
  deleteFileFromWorkspace: (workspace: string, fileName: string) => void;
}

export const useWorkspaceStore = create<iWorkspaceStore>()(
  devtools(
    persist(
      (set) => ({
        workspaces: [],
        selectedFile: null,
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
        setSelectedFile: (file) =>
          set({
            selectedFile: {
              path: file.path,
              content: file.content,
            },
          }),
        addFileToWorkspace: (folderPath, file) =>
          set((state) => ({
            ...state,
            workspaces: state.workspaces.map((w) =>
              w.folderPath === folderPath
                ? { ...w, files: [...w.files, file] }
                : w,
            ),
          })),
        deleteFileFromWorkspace: (workspace, fileName) =>
          set((state) => ({
            ...state,
            workspaces: state.workspaces.map((w) =>
              w.folderPath === workspace
                ? {
                    ...w,
                    files: w.files.filter((f) => f.name !== fileName),
                  }
                : w,
            ),
          })),
      }),
      {
        name: "workspace-store",
      },
    ),
  ),
);
