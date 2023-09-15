import { FolderOpen, Trash } from "lucide-react";
import { toast } from "sonner";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { selectFolder } from "@/functions/selectFolder";

import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface WorkspacesProps {
  checkOption?: boolean;
}

const Workspaces = (props: WorkspacesProps) => {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);
  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace);
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );

  const handleAddWorkspace = async () => {
    try {
      const folder = await selectFolder();
      if (!folder) {
        return;
      }
      // Check if folder is already added:
      if (
        workspaces
          .map((workspace) => workspace.folderPath)
          .includes(folder?.folderPath)
      ) {
        toast.error("The workspace already exists.", {
          description: `${folder.folderName} is already added as a workspace.`,
        });
        return;
      }
      // Add folder to workspaces:
      addWorkspace({
        folderName: folder.folderName,
        folderPath: folder.folderPath,
        createdAt: new Date(),
      });
      // Select workspace:
      selectWorkspace(folder.folderPath);
      // Show toast:
      toast.success(`Workspace added.`, {
        description: `You can now start working on ${folder.folderName}.`,
      });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteWorkspace = (path: string) => {
    selectWorkspace(null);
    deleteWorkspace(path);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button
        variant="outline"
        className="flex w-full items-center space-x-2"
        onClick={(e) => {
          e.preventDefault();
          handleAddWorkspace();
        }}
      >
        <FolderOpen size={16} />
        <span>Choose folder...</span>
      </Button>
      <RadioGroup className="rounded-md border border-neutral-800 p-3 text-sm">
        {workspaces.length > 0 ? (
          workspaces.sort().map((workspace) => (
            <div
              className="flex items-center justify-between"
              key={workspace.folderPath}
            >
              <div className="flex items-center space-x-2">
                {props.checkOption && (
                  <RadioGroupItem
                    value={workspace.folderPath}
                    id={workspace.folderPath}
                    onClick={() => selectWorkspace(workspace.folderPath)}
                    checked={
                      workspace.folderPath === selectedWorkspace?.folderPath
                    }
                  />
                )}
                <label htmlFor={workspace.folderPath}>
                  {workspace.folderName}
                </label>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteWorkspace(workspace.folderPath)}
              >
                <Trash size={15} />
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center space-y-2 text-center text-neutral-400">
            <p>You don't have any workspaces yet.</p>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default Workspaces;
