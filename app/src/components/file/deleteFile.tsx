import type { ReactNode } from "react";
import { useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";

import { useFilesStore } from "@/store/filesStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface iDeleteFileProps {
  children: ReactNode;
}

interface iCreateFileInputs {
  title: string;
  extension: string;
}

const DeleteFile = (props: iDeleteFileProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const addFile = useFilesStore((state) => state.addFile);
  const selectFile = useFilesStore((state) => state.setSelectedFile);

  // Delete function:
  //   const handleDeleteFile = async () => {
  //     try {
  //       const desktopPath = await desktopDir();
  //       setOpenDialog(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <Popover>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default DeleteFile;
