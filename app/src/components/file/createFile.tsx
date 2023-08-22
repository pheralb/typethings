import type { ReactNode } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { desktopDir } from "@tauri-apps/api/path";

import { createUpdateFile } from "@/functions/createUpdateFile";
import { useFilesStore } from "@/store/filesStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface iCreateFileProps {
  trigger: ReactNode;
}

interface iCreateFileInputs {
  title: string;
  extension: string;
}

const CreateFile = (props: iCreateFileProps) => {
  const { register, handleSubmit } = useForm<iCreateFileInputs>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const addFile = useFilesStore((state) => state.addFile);
  const selectFile = useFilesStore((state) => state.setSelectedFile);

  // Create New File function:
  const handleCreateFile: SubmitHandler<iCreateFileInputs> = async (data) => {
    try {
      const desktopPath = await desktopDir();
      await createUpdateFile({
        directory: desktopPath,
        folder: "taurifiles",
        filename: data.title,
        extension: "ts",
        content: "",
      });
      setOpenDialog(false);
      addFile(`${data.title}.${"md"}`);
      selectFile({
        filename: data.title,
        extension: "md",
        content: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New file</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleCreateFile)}
          className="flex flex-col space-y-2"
        >
          <Input
            id="title"
            className="mt-1"
            placeholder="Enter title..."
            {...register("title", { required: true })}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFile;
