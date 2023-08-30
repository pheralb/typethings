import type { EditorProviderProps } from "@tiptap/react";
import { EditorProvider } from "@tiptap/react";

export interface CustomEditorProps extends EditorProviderProps {
  editorClassName?: string;
}
