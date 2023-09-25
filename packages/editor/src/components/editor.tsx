import type { CustomEditorProps } from "../types/editorProps";

// Main Editor Component:
import { EditorContent } from "@tiptap/react";

const Editor = (props: CustomEditorProps) => {
  return (
    <>
      {props.children}
      <EditorContent
        autoFocus={props.autoFocus}
        editor={props.editor}
        className={props.editorContentClassName}
        content={props.defaultValue}
      />
    </>
  );
};

export { Editor };
