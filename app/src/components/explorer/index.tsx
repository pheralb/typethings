
import { useWorkspaceStore } from "@/store/workspaceStore";
import Folder from "../folder";

import ManageWorkspaces from "../workspaces/manageWorkspaces";
import { Button } from "@typethings/ui";
import FileList from "../file/fileList";

const Explorer = () => {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  return (
    <div className="flex flex-col">
      {workspaces.length > 0 ? (
        workspaces.sort().map((workspace) => (
          <Folder
            key={workspace.folderPath}
            name={workspace.folderName}
            path={workspace.folderPath}
          >
            <FileList
              directory={workspace.folderPath}
              folder={workspace.folderName}
            />
          </Folder>
        ))
      ) : (
        <div className="flex flex-col justify-center space-y-2 rounded-md border border-dashed border-neutral-300 p-3 text-center text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          <p>Add a workspace to get started.</p>
          <ManageWorkspaces
            trigger={
              <Button
                variant="link"
                className="flex h-0 w-full items-center space-x-2 text-xs"
              >
                <span>Get started</span>
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Explorer;
