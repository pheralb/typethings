import type { EditorEvents } from "@tiptap/core";
import type { Editor } from "@tiptap/react";

export interface CustomEditorProps {
  children: React.ReactNode;
  spellCheck?: boolean;
  editor: Editor | null;
  defaultValue: string | undefined;
  onUpdate: (props: EditorEvents["update"]) => void;
  editorContentClassName?: string;
  autoFocus?: boolean;
}
