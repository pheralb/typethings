import type { FileEntry } from "@tauri-apps/api/fs";

import {
  Button,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@typethings/ui";

import { toast } from "sonner";
import { deleteFile } from "@typethings/functions";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "@/store/workspaceStore";

interface iDeleteFileProps {
  file: FileEntry;
  workspace: string;
}

const DeleteFile = (props: iDeleteFileProps) => {
  const removeFileStore = useWorkspaceStore(
    (state) => state.deleteFileFromWorkspace,
  );
  const router = useNavigate();
  // Delete function:
  const handleDeleteFile = async () => {
    try {
      router("/");
      await deleteFile({
        path: props.file.path,
      });
      removeFileStore(props.workspace, props.file.name!);
      toast("Deleted file");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete file</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete "{props.file.name}"? This action
          cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="cursor-default border border-red-900"
            onClick={() => {
              handleDeleteFile();
            }}
          >
            Confirm
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteFile;
