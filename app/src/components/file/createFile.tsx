import type { ReactNode } from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { toast } from "sonner";

import { createFile } from "@typethings/functions";

import {
  Input,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormGroup,
  Button,
} from "@typethings/ui";

import Tip from "@/components/tip";
import Workspaces from "@/components/workspaces";

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
  const selectFile = useWorkspaceStore((state) => state.setSelectedFile);
  const addFile = useWorkspaceStore((state) => state.addFileToWorkspace);
  const route = useNavigate();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );
  useHotkeys("ctrl+n", () => setOpenDialog(true));

  // Create New File function:
  const handleCreateFile: SubmitHandler<iCreateFileInputs> = async (data) => {
    if (!selectedWorkspace) {
      toast.error("Please select a workspace.");
      return false;
    }
    try {
      const fullPath = await createFile({
        path: selectedWorkspace?.folderPath || "",
        filename: data.title,
        extension: "md",
        content: "",
      });
      const file = {
        name: `${data.title}.md`,
        path: fullPath,
      };
      addFile(selectedWorkspace.folderPath, file);
      selectFile({
        path: fullPath,
        content: "",
      });
      setOpenDialog(false);
      route(`/editor`);
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
        <form onSubmit={handleSubmit(handleCreateFile)}>
          <FormGroup>
            <label htmlFor="title" className="text-sm">
              Title:
            </label>
            <Input
              id="title"
              placeholder="Enter title..."
              {...register("title", { required: true })}
            />
          </FormGroup>
        </form>
        <FormGroup>
          <div className="flex items-center justify-between">
            <label htmlFor="extension" className="text-sm">
              Workspace:
            </label>
            <Tip
              text="The workspace is the folder where your document will be saved. Select a folder and it will automatically be added to the workspace."
              iconSize={13}
            />
          </div>
          <Workspaces checkOption={true} />
        </FormGroup>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedWorkspace}
            onClick={handleSubmit(handleCreateFile)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFile;
