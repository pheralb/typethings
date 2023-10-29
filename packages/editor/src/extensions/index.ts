import type { Extensions as iTiptapExtensions } from "@tiptap/react";

// Extensions:
// ------------------
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Markdown } from "tiptap-markdown";
import { common, createLowlight } from "lowlight";

// Custom code block:
// ------------------
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

const lowlight = createLowlight(common);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

// Table extensions:
// -----------------

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
      },
    };
  },
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
      },
    };
  },
});

// Create extensions config:
// -------------------------

export const Extensions: iTiptapExtensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "m-0 leading-7",
      },
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: "font-bold leading-7 [&:not(:first-child)]:mt-6",
      },
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: "mt-0",
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: "-mt-2",
      },
    },
  }),
  Link.configure({
    openOnClick: false,
    validate: (href) => /^https?:\/\//.test(href),
    // HTMLAttributes: { rel: "noopener noreferrer" },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class:
        "w-full bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-dark",
    },
  }),
  CustomTable.configure({
    resizable: false,
    HTMLAttributes: {
      class: "w-full caption-bottom text-sm -mb-1",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "-my-2",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "text-base",
    },
  }),
  CustomTableCell.configure({
    HTMLAttributes: {
      class: "-my-1",
    },
  }),
  Markdown.configure({
    html: true,
    tightLists: false,
    tightListClass: "tight",
    bulletListMarker: "-",
    transformPastedText: true,
    transformCopiedText: true,
    breaks: false,
    linkify: true,
  }),
  Color.configure({ types: [TextStyle.name] }),

  TextStyle,
];
