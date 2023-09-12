import type { ReactNode } from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useForm, SubmitHandler } from "react-hook-form";
import { join } from "@tauri-apps/api/path";

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
import FormGroup from "@/components/ui/formGroup";
import Tip from "@/components/tip";
import Workspaces from "../workspaces";

interface iCreateFileProps {
  trigger: ReactNode;
}

interface iCreateFileInputs {
  title: string;
  path: string;
}

const CreateFile = (props: iCreateFileProps) => {
  const { register, handleSubmit } = useForm<iCreateFileInputs>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const addFile = useFilesStore((state) => state.addFile);
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  useHotkeys("ctrl+n", () => setOpenDialog(true));

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
      const getFullPath = await join(
        data.path,
        "taurifiles",
        `${data.title}.${"md"}`,
      );
      setOpenDialog(false);
      addFile({
        name: `${data.title}.${"md"}`,
        path: getFullPath,
      });
      selectFile({
        name: `${data.title}.${"md"}`,
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
          <FormGroup>
            <label htmlFor="title" className="text-sm text-neutral-400">
              Title:
            </label>
            <Input
              id="title"
              placeholder="Enter title..."
              {...register("title", { required: true })}
            />
          </FormGroup>
          <FormGroup>
            <div className="flex items-center justify-between">
              <label htmlFor="extension" className="text-sm text-neutral-400">
                Workspace:
              </label>
              <Tip
                text="The workspace is the folder where your document will be saved. Select a folder and it will automatically be added to the workspace :)"
                iconSize={13}
              />
            </div>
            <Workspaces />
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFile;
