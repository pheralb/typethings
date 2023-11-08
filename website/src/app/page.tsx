import Container from "@/components/container";
import Features from "@/components/features";
import Mac from "@/components/icons/mac";
import Windows from "@/components/icons/windows";
import { Global } from "@/global/data";
import { buttonVariants, cn } from "@typethings/ui";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const getOsInfo = () => {
    const isMac =
      typeof window !== "undefined"
        ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
        : false;
    return isMac ? "for Mac" : "for Windows";
  };

  return (
    <>
      <section className="py-12">
        <Container>
          <div className="mx-auto items-center gap-8 md:grid md:grid-cols-2 xl:gap-16">
            <div className="animate-in slide-in-from-bottom-8 fade-in-10 mt-4 duration-700 md:mt-0">
              <h2 className="leading-1 mb-4 text-5xl font-medium tracking-tighter text-gray-900 dark:text-white">
                A beautiful note taking app.
              </h2>
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                Typethings is a simple, beautiful and powerful markdown editor
                with a minimalistic design. It{"'"}s 💸 free, 🔒 private and ✨
                open source.
              </p>
              <div className="mt-3 flex items-center space-x-2">
                <Link
                  href="/docs/get-started"
                  className={buttonVariants({
                    variant: "outline",
                    className: "h-[48px] cursor-pointer space-x-2",
                  })}
                >
                  <Book className="h-5 w-5" />
                  <span>Get started</span>
                </Link>
                <Link
                  href={Global.activateDownload ? "/download" : "#"}
                  className={cn(
                    "relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-offset-slate-50",
                    {
                      "cursor-pointer": Global.activateDownload,
                      "cursor-not-allowed opacity-50": !Global.activateDownload,
                    },
                  )}
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1d1d1d_0%,#393BB2_50%,#1d1d1d_100%)]" />
                  <div className="inline-flex h-full w-full items-center justify-center space-x-2 rounded-md bg-neutral-800 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl duration-150 hover:bg-neutral-700/20">
                    {getOsInfo() === "for Windows" ? (
                      <Windows width={14} />
                    ) : (
                      <Mac width={14} />
                    )}
                    <span>Download {getOsInfo()}</span>
                  </div>
                </Link>
              </div>
            </div>
            <Image
              sizes="100vw"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
              className="w-full rounded-md delay-300"
              src="/images/screenshot_en.png"
              alt="Typethings screenshot"
            />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Features />
        </Container>
      </section>
    </>
  );
}
