import type { Editor } from "@tiptap/react";

export interface MenuEditorProps {
  editor: Editor | null;
  btnClassName?: string;
  btnActiveClassName?: string;
  btnGroupClassName?: string;
}