import type { Extensions as iTiptapExtensions } from "@tiptap/react";

// Extensions:
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export const Extensions: iTiptapExtensions = [
  Markdown,
  Color.configure({ types: [TextStyle.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];
