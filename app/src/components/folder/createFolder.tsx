import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  FormGroup,
  DialogFooter,
  Button,
} from "@typethings/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { createFolder } from "@typethings/functions";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { toast } from "sonner";

interface iCreateFolderProps {
  trigger: ReactNode;
}

interface iCreateFolderInputs {
  title: string;
}

const CreateFolder = (props: iCreateFolderProps) => {
  const { register, handleSubmit } = useForm<iCreateFolderInputs>();
  const [open, setOpen] = useState<boolean>(false);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  const handleCreateFolder: SubmitHandler<iCreateFolderInputs> = async (
    data,
  ) => {
    try {
      if (workspaces.some((workspace) => workspace.folderName === data.title)) {
        toast.error(`Folder already exists.`);
        return;
      }
      const create = await createFolder(data.title);
      addWorkspace({
        folderName: data.title,
        folderPath: create?.directory!,
        files: [],
        createdAt: new Date(),
      });
      setOpen(false);
      toast.success(`Folder created successfully.`, {
        description: `Created on ${create?.directory!}.`,
      });
    } catch (error) {
      console.log(error);
      toast.success(`An error occurred.`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription>
            A folder will be created in your system documents folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateFolder)}>
          <FormGroup>
            <label htmlFor="title">Folder name:</label>
            <Input id="title" {...register("title", { required: true })} />
          </FormGroup>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolder;
