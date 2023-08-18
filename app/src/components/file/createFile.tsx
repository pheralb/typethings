import type { ReactNode } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createNewFile } from "@/functions/createNewFile";

interface iCreateFileProps {
  trigger: ReactNode;
}

interface iCreateFileInputs {
  title: string;
}

const CreateFile = (props: iCreateFileProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<iCreateFileInputs>();
  const [open, setOpen] = useState<boolean>(false);

  // Create New File function:
  const handleCreateFile: SubmitHandler<iCreateFileInputs> = async (data) => {
    try {
      await createNewFile({
        folder: "taurifiles",
        filename: data.title,
        extension: "md",
        content: "hello world",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New file</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateFile)}>
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
