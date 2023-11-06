import type { MenuEditorProps } from "../types/menuProps";
import { cn } from "../utils/cn";

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
  Link2,
  List,
  ListOrdered,
  Minus,
  Paintbrush,
  Pilcrow,
  SaveAll,
  StrikethroughIcon,
  Table,
  TextQuote,
  WrapText,
  XSquare,
} from "lucide-react";

// Components:
import BtnTooltip from "./tooltip";

const Menu = (props: MenuEditorProps) => {

  // Icons size:
  const iconSize = 16 || props.iconSize;

  return (
    <div className={cn(props.btnGroupClassName)}>
      {/* ------------------------ */}
      {/* Undo & Redo */}
      {/* ------------------------ */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Undo" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().undo().run()}
            disabled={!props.editor?.can().chain().focus().undo().run()}
            className={cn(props.btnClassName)}
            aria-label="Undo"
          >
            <ArrowLeft size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Redo" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().redo().run()}
            disabled={!props.editor?.can().chain().focus().redo().run()}
            className={cn(props.btnClassName)}
            aria-label="Redo"
          >
            <ArrowRight size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* ------------------------ */}
      {/* Bold, Italic & Striket: */}
      {/* ------------------------ */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Bold" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().toggleBold().run()}
            disabled={!props.editor?.can().chain().focus().toggleBold().run()}
            className={cn(
              props.btnClassName,
              props.editor?.isActive("bold") ? props.btnActiveClassName : "",
            )}
            aria-label="Bold"
          >
            <BoldIcon size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Italic" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().toggleItalic().run()}
            disabled={!props.editor?.can().chain().focus().toggleItalic().run()}
            className={cn(
              props.btnClassName,
              props.editor?.isActive("italic") ? props.btnActiveClassName : "",
            )}
            aria-label="Italic"
          >
            <ItalicIcon size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Strike" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().toggleStrike().run()}
            disabled={!props.editor?.can().chain().focus().toggleStrike().run()}
            className={cn(
              props.btnClassName,
              props.editor?.isActive("strike") ? props.btnActiveClassName : "",
            )}
          >
            <StrikethroughIcon size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Code blocks: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Inline code" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().toggleCode().run()}
            disabled={!props.editor?.can().chain().focus().toggleCode().run()}
            className={cn(
              props.btnClassName,
              props.editor?.isActive("code") ? props.btnActiveClassName : "",
            )}
          >
            <CodeIcon size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Code block" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleCodeBlock().run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("codeBlock")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Code2Icon size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Link" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor
                ?.chain()
                .focus()
                .setLink({ href: "https://example.com", target: "_blank" })
                .run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("codeBlock")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Link2 size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Text size: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Paragraph" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().setParagraph().run()}
            className={cn(
              props.btnClassName,
              props.editor?.isActive("paragraph")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Pilcrow size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 1" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 1 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading1 size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 2" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 2 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading2 size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 3" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 3 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading3 size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 4" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 4 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading4 size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 5" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 5 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading5 size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Heading 6" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("heading", { level: 6 })
                ? props.btnActiveClassName
                : "",
            )}
          >
            <Heading6 size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Table: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Insert Table" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor
                ?.chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className={cn(props.btnClassName)}
          >
            <Table size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Delete Table" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().deleteTable().run()}
            className={cn(props.btnClassName)}
          >
            <XSquare size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Lists: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Bullet list" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleBulletList().run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("bulletList")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <List size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Ordered list" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleOrderedList().run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("orderedList")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <ListOrdered size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Quote: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        <BtnTooltip text="Blockquote" className={props.btnToolTipClassName}>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleBlockquote().run()
            }
            className={cn(
              props.btnClassName,
              props.editor?.isActive("blockquote")
                ? props.btnActiveClassName
                : "",
            )}
          >
            <TextQuote size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip
          text="Horizontal Rule"
          className={props.btnToolTipClassName}
        >
          <button
            onClick={() =>
              props.editor?.chain().focus().setHorizontalRule().run()
            }
            className={cn(props.btnClassName)}
          >
            <Minus size={iconSize} />
          </button>
        </BtnTooltip>
        <BtnTooltip text="Hard break" className={props.btnToolTipClassName}>
          <button
            onClick={() => props.editor?.chain().focus().setHardBreak().run()}
            className={cn(props.btnClassName)}
          >
            <WrapText size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
      {/* -------------------- */}
      {/* Save option: */}
      {/* -------------------- */}
      <div className={cn(props.btnGroupDividerClassName)}>
        {props.saveOnClickFn && (
          <BtnTooltip text="Save" className={props.btnToolTipClassName}>
            <button
              onClick={props.saveOnClickFn}
              className={cn(props.btnClassName)}
            >
              <SaveAll size={iconSize} />
            </button>
          </BtnTooltip>
        )}
        <BtnTooltip
          text="Remove all marks"
          className={props.btnToolTipClassName}
        >
          <button
            onClick={() => props.editor?.chain().focus().unsetAllMarks().run()}
            className={cn(props.btnClassName)}
          >
            <Paintbrush size={iconSize} />
          </button>
        </BtnTooltip>
      </div>
    </div>
  );
};

export { Menu };
