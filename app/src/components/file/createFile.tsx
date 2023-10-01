import type { ReactNode } from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { toast } from "sonner";

import { createFile } from "@/functions/createUpdateFile";
import { useFilesStore } from "@/store/filesStore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FormGroup from "@/components/ui/formGroup";
import { Button } from "@/components/ui/button";
import Tip from "@/components/tip";
import Workspaces from "@/components/workspaces";
import { useNavigate } from "react-router-dom";

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
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  const route = useNavigate();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );
  useHotkeys("ctrl+n", () => setOpenDialog(true));

  // Create New File function:
  const handleCreateFile: SubmitHandler<iCreateFileInputs> = async (data) => {
    if (!selectedWorkspace) {
      toast.error("Please select a workspace.");
      return;
    }

    try {
      const fullPath = await createFile({
        path: selectedWorkspace?.folderPath || "",
        filename: data.title,
        extension: "md",
        content: "",
      });
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
        <FormGroup className="mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="extension" className="text-sm text-neutral-400">
              Workspace:
            </label>
            <Tip
              text="The workspace is the folder where your document will be saved. Select a folder and it will automatically be added to the workspace :)"
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
