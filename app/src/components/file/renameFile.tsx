import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

const RenameFile = () => {

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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default RenameFile;
