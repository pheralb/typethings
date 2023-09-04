import type { ReactNode } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { desktopDir, join } from "@tauri-apps/api/path";

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
import { Button } from "../ui/button";

interface iCreateFileProps {
  trigger: ReactNode;
}

interface iCreateFileInputs {
  title: string;
  path: string;
}

const CreateFile = (props: iCreateFileProps) => {
  const { register, handleSubmit, setValue } = useForm<iCreateFileInputs>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const addFile = useFilesStore((state) => state.addFile);
  const selectFile = useFilesStore((state) => state.setSelectedFile);

  // Create New File function:
  const handleCreateFile: SubmitHandler<iCreateFileInputs> = async (data) => {
    try {
      console.log(data);
      await createUpdateFile({
        path: data.path,
        folder: "taurifiles",
        filename: data.title,
        extension: "md",
        content: "",
      });
      const getFullPath = await join(data.path, "taurifiles", `${data.title}.${"md"}`);
      console.log(getFullPath);
      setOpenDialog(false);
      addFile({
        name: `${data.title}.${"md"}`,
        path: getFullPath,
      });
      selectFile({
        path: getFullPath,
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
          <label htmlFor="title">Title:</label>
          <Input
            id="title"
            placeholder="Enter title..."
            {...register("title", { required: true })}
          />
          <label htmlFor="extension">Workspace:</label>
          <Button
            onClick={async () => {
              const desktop = await desktopDir();
              setValue("path", desktop);
            }}
          >
            Desktop
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFile;
