import type { MenuEditorProps } from "../types/menuProps";
import { cn } from "../utils/cn";

import { useCurrentEditor } from "@tiptap/react";

// All icons:
import {
  ArrowLeft,
  ArrowRight,
  BoldIcon,
  Code2Icon,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ItalicIcon,
  List,
  ListOrdered,
  Minus,
  Paintbrush,
  Pilcrow,
  StrikethroughIcon,
  TextQuote,
  WrapText,
} from "lucide-react";

// Icons size:
const iconSize = 16;

const Menu = (props: MenuEditorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <div className={cn(props.btnGroupClassName)}>
      {/* ------------------------ */}
      {/* Undo & Redo */}
      {/* ------------------------ */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={cn(props.btnClassName)}
        aria-label="Undo"
      >
        <ArrowLeft size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={cn(props.btnClassName)}
        aria-label="Redo"
      >
        <ArrowRight size={iconSize} />
      </button>
      {/* ------------------------ */}
      {/* Bold, Italic & Striket: */}
      {/* ------------------------ */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("bold") ? props.btnActiveClassName : "",
        )}
        aria-label="Bold"
      >
        <BoldIcon size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("italic") ? props.btnActiveClassName : "",
        )}
        aria-label="Italic"
      >
        <ItalicIcon size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("strike") ? props.btnActiveClassName : "",
        )}
      >
        <StrikethroughIcon size={iconSize} />
      </button>
      {/* -------------------- */}
      {/* Code blocks: */}
      {/* -------------------- */}
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("code") ? props.btnActiveClassName : "",
        )}
      >
        <CodeIcon size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("codeBlock") ? props.btnActiveClassName : "",
        )}
      >
        <Code2Icon size={iconSize} />
      </button>
      {/* -------------------- */}
      {/* Clear: */}
      {/* -------------------- */}
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={cn(props.btnClassName)}
      >
        <Paintbrush size={iconSize} />
      </button>
      {/* -------------------- */}
      {/* Text size: */}
      {/* -------------------- */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("paragraph") ? props.btnActiveClassName : "",
        )}
      >
        <Pilcrow size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 1 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading1 size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 2 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading2 size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 3 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading3 size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 4 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading4 size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 5 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading5 size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          props.btnClassName,
          editor.isActive("heading", { level: 6 })
            ? props.btnActiveClassName
            : "",
        )}
      >
        <Heading6 size={iconSize} />
      </button>
      {/* -------------------- */}
      {/* Lists: */}
      {/* -------------------- */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("bulletList") ? props.btnActiveClassName : "",
        )}
      >
        <List size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("orderedList") ? props.btnActiveClassName : "",
        )}
      >
        <ListOrdered size={iconSize} />
      </button>
      {/* -------------------- */}
      {/* Quote: */}
      {/* -------------------- */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          props.btnClassName,
          editor.isActive("blockquote") ? props.btnActiveClassName : "",
        )}
      >
        <TextQuote size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={cn(props.btnClassName)}
      >
        <Minus size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={cn(props.btnClassName)}
      >
        <WrapText size={iconSize} />
      </button>
      {/* -------------------- */}
    </div>
  );
};

export default Menu;
