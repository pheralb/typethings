import { Button } from "@typethings/ui";
import { toast } from "sonner";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center space-y-2">
        <h2 className="text-5xl font-extrabold tracking-tighter text-neutral-300 md:text-6xl">
          Good morning
        </h2>
        <Button
          variant="outline"
          onClick={() =>
            toast("hello", {
              description: "This is a description",
            })
          }
        >
          Hello
        </Button>
      </div>
    </>
  );
}

export default App;
