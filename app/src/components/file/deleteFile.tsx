import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { desktopDir } from "@tauri-apps/api/path";
import { toast } from "sonner";
import { deleteFile } from "@/functions/deleteFile";
import { useFilesStore } from "@/store/filesStore";

interface iDeleteFileProps {
  filename: string;
  extension: string;
}

const DeleteFile = (props: iDeleteFileProps) => {
  const removeFileStore = useFilesStore((state) => state.removeFile);
  const setSelectedFileStore = useFilesStore((state) => state.setSelectedFile);

  // Delete function:
  const handleDeleteFile = async () => {
    try {
      const desktopPath = await desktopDir();
      await deleteFile({
        directory: desktopPath,
        folder: "taurifiles",
        filename: props.filename,
        extension: props.extension,
      });
      removeFileStore(`${props.filename}.${props.extension}`);
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
          Are you sure you want to delete "{props.filename}"? This action cannot
          be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="border-red-900"
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
