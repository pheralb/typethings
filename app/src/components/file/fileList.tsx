import type { FileEntry } from "@typethings/functions";
import FileItem from "./fileItem";

interface iFileListProps {
  files: FileEntry[];
}

const FileList = ({ files }: iFileListProps) => {
  return (
    <div className="flex flex-col space-y-0">
      {files ? (
        files.map((file) => (
          <FileItem key={file.name} name={file.name!} path={file.path!} />
        ))
      ) : (
        <div className="flex flex-col justify-start text-neutral-400">
          <p className="text-sm">No markdown files.</p>
        </div>
      )}
    </div>
  );
};

export default FileList;
