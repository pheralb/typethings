import Editor from "./components/editor";
import CreateFile from "./components/file/createFile";
import FileList from "./components/file/fileList";

function App() {
  return (
    <main className="grid h-screen grid-cols-12">
      <aside className="col-span-3 border-r border-neutral-800">
        <CreateFile />
        <FileList />
      </aside>
      <div className="col-span-9">
        <Editor />
      </div>
    </main>
  );
}

export default App;
