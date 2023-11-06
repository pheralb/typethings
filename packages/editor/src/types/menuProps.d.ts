import type { Editor } from "@tiptap/react";

export interface MenuEditorProps {
  editor: Editor | null;
  iconSize?: number;
  btnClassName?: string;
  btnActiveClassName?: string;
  btnToolTipClassName?: string;
  btnGroupClassName?: string;
  btnGroupDividerClassName?: string;
  saveOnClickFn?: () => void;
}