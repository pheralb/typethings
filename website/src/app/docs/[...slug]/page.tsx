import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { ProseClasses, cn } from "@typethings/ui";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <div className="mb-10 border-b pb-5">
        <h1 className="mb-3 inline-block text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-neutral-400">{page.description}</p>
        )}
      </div>
      <article
        className={cn(
          "prose prose-quoteless prose-neutral dark:prose-invert prose-p:my-4 prose-a:no-underline prose-a:underline-offset-[5px] prose-a:duration-100 hover:prose-a:underline prose-a:decoration-neutral-600 prose-a:decoration-solid",
        )}
      >
        <Mdx code={page.body.code} />
      </article>
    </main>
  );
}
