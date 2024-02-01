import Container from "@/components/container";
import CreateFile from "@/components/file/createFile";
import PageNavbar from "@/components/pageNavbar";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Button } from "@typethings/ui";
import { Plus } from "lucide-react";

function App() {
  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <PageNavbar title="Inbox" border={false}>
      <Container>
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-medium sm:text-3xl">{greeting()}</h1>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <CreateFile
                trigger={
                  <Button
                    variant="default"
                    size="lg"
                    className="flex items-center space-x-3"
                  >
                    <Plus size={16} />
                    <span>New</span>
                  </Button>
                }
              />
            </div>
          </div>
        </header>
        <main>
          {workspaces.map((workspace) => (
            <div key={workspace.folderPath}>
              <h1>{workspace.folderName}</h1>
            </div>
          ))}
        </main>
      </Container>
    </PageNavbar>
  );
}

export default App;
