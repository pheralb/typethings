import type { ComputedFields, FieldDefs } from "contentlayer/source-files";
import { defineDocumentType, makeSource } from "contentlayer/source-files";

// Remark/Rehype extensions:
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Custom styles:
import { headingStyles } from "./src/styles/headings";

// Define a document type:
const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

// Shared fields:
const sharedFields: FieldDefs = {
  order: {
    type: "number",
    required: true,
  },
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
};

// Pages:
export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: sharedFields,
  computedFields,
}));

export const EditorPages = defineDocumentType(() => ({
  name: "EditorPages",
  filePathPattern: `editor/**/*.mdx`,
  contentType: "mdx",
  fields: sharedFields,
  computedFields,
}));

// Create the source:
export default makeSource({
  contentDirPath: "./docs",
  documentTypes: [Page, EditorPages],
  mdx: {
    rehypePlugins: [
      [rehypeSlug],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [headingStyles],
          },
        },
      ],
    ],
  },
});
