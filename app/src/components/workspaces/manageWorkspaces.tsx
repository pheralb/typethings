import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
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
        </DialogHeader>
        <Workspaces checkOption={false} />
      </DialogContent>
    </Dialog>
  );
};

export default ManageWorkspaces;
