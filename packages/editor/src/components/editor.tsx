import type { CustomEditorProps } from "../types/editorProps";

// Tiptap Provider:
import { EditorProvider } from "@tiptap/react";

// Extensions:
import { extensions } from "../extensions";

export const TiptapEditor = (props: CustomEditorProps) => {
  return (
    <EditorProvider
      slotBefore={props.slotBefore}
      extensions={extensions}
      content={props.content}
      editable={true}
      autofocus={true}
      editorProps={{
        attributes: {
          class: props.editorClassName || "",
        },
      }}
      {...props}
    >
      {props.children}
    </EditorProvider>
  );
};

export default TiptapEditor;
