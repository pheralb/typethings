import type { EditorProps } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";

const CustomEditor = (props: EditorProps) => {
  return <Editor theme="vs-dark" height="100vh" {...props} />;
};

export default CustomEditor;
