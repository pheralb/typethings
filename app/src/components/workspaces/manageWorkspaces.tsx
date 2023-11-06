import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@typethings/ui";

import Workspaces from "@/components/workspaces";

interface ManageWorkspacesProps {
  trigger: ReactNode;
}

const ManageWorkspaces = (props: ManageWorkspacesProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage workspaces</DialogTitle>
          <DialogDescription>
            A workspace is a system folder. Here you can add and remove
            workspaces. Close a workspace does not delete the folder.
          </DialogDescription>
        </DialogHeader>
        <Workspaces checkOption={false} />
      </DialogContent>
    </Dialog>
  );
};

export default ManageWorkspaces;
