import type { ReactNode } from "react";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@typethings/ui";

// import { openFile } from "@/functions/openFile";

interface iCreateFileProps {
  trigger: ReactNode;
}

const OpenFile = (props: iCreateFileProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenFile = async () => {
    try {
      // const selectedFile = await openFile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open file</DialogTitle>
        </DialogHeader>
        <div className="border border-neutral-700 p-3">
          <Button onClick={handleOpenFile}>Open file</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenFile;
