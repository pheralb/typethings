import type { Monaco, EditorProps } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import CSTheme from "@/styles/monaco-theme.json";

const CustomEditor = (props: EditorProps) => {
  // Set custom theme:
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      ...CSTheme,
    });
  };

  return (
    <Editor
      theme="customTheme"
      height="100vh"
      beforeMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        fontFamily: "Jetbrains-Mono",
        fontLigatures: true,
        wordWrap: "on",
        minimap: {
          enabled: false,
        },
        bracketPairColorization: {
          enabled: true,
        },
        cursorBlinking: "expand",
        quickSuggestions: false,
        formatOnPaste: true,
        suggest: {
          showFields: false,
          showFunctions: false,
        },
      }}
      {...props}
    />
  );
};

export default CustomEditor;
