import { useState } from "react";
import { FolderIcon, FolderOpen, FolderPlus, Search, X } from "lucide-react";
import { toast } from "sonner";

import { useWorkspaceStore } from "@/store/workspaceStore";
import {
  checkDirFile,
  readFilesFromFolder,
  selectFolder,
} from "@typethings/functions";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  RadioGroup,
  RadioGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@typethings/ui";
import CreateFolder from "../folder/createFolder";

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
  const [search, setSearch] = useState<string>("");
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);

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
      // Get files from folder:
      const result = await readFilesFromFolder({
        path: folder.folderPath,
      });
      // Add folder to workspaces:
      addWorkspace({
        folderName: folder.folderName,
        folderPath: folder.folderPath,
        files: result!,
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

  const handleSelectWorkspace = async (path: string) => {
    try {
      const check = await checkDirFile(path);
      if (!check) {
        toast.error("Directory not found.", {
          description: `The directory ${path} was not found.`,
        });
        deleteWorkspace(path);
        return;
      }
      selectWorkspace(path);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Collapsible open={openCollapsible} onOpenChange={setOpenCollapsible}>
        <div className="flex items-center space-x-2">
          <CreateFolder
            trigger={
              <Button
                variant="outline"
                className="flex w-full items-center space-x-2"
              >
                <FolderPlus size={16} />
                <span>New</span>
              </Button>
            }
          />
          <Button
            variant="outline"
            className="flex w-full items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              handleAddWorkspace();
            }}
          >
            <FolderOpen size={16} />
            <span>Open</span>
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="icon" className="flex w-32">
              {openCollapsible ? <X size={16} /> : <Search size={16} />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Input
            autoFocus
            placeholder="Search..."
            className="mt-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        </CollapsibleContent>
      </Collapsible>
      <RadioGroup className="rounded-md border border-neutral-300 p-3 text-sm dark:border-neutral-800">
        {workspaces.length > 0 ? (
          workspaces
            .sort()
            .filter(
              search
                ? (workspace) =>
                    workspace.folderName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                : () => true,
            )
            .map((workspace) => (
              <div
                className="flex items-center justify-between overflow-hidden"
                key={workspace.folderPath}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div>
                    {props.checkOption ? (
                      <RadioGroupItem
                        value={workspace.folderPath}
                        id={workspace.folderPath}
                        onClick={() =>
                          handleSelectWorkspace(workspace.folderPath)
                        }
                        checked={
                          workspace.folderPath === selectedWorkspace?.folderPath
                        }
                      />
                    ) : (
                      <FolderIcon size={16} className="text-neutral-500" />
                    )}
                  </div>
                  <label
                    htmlFor={workspace.folderPath}
                    className="truncate"
                    title={workspace.folderName}
                  >
                    {workspace.folderName}
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDeleteWorkspace(workspace.folderPath)
                        }
                      >
                        <X size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Close workspace
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))
        ) : (
          <div className="flex flex-col justify-center space-y-2 text-center text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
            <p>You don't have any workspaces yet.</p>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default Workspaces;
