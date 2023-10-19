import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import Container from "@/components/container";
import SnowfallComponent from "@/components/snowfall";
import { Button, cn } from "@typethings/ui";
import { ArrowDown, ArrowRight, Download, DownloadCloud } from "lucide-react";

const Page = () => {
  return (
    <>
      <section className="z-50 mt-20 flex w-full flex-col items-center justify-center space-y-6">
        <SnowfallComponent color="gray" snowflakeCount={4} />
        <Container className="text-center">
          <Balancer
            className={cn(
              "text-5xl font-bold tracking-tighter md:text-6xl",
              "animate-in slide-in-from-bottom-2 fade-out-0 duration-500",
            )}
          >
            Organize your things with markdown notes
          </Balancer>
        </Container>
        <div className="flex items-center space-x-1 text-center text-xl tracking-tighter text-neutral-900 dark:text-neutral-400">
          <p>A beautiful and powerful markdown editor,</p>
          <RoughNotation type="underline" show={true}>
            free and open source.
          </RoughNotation>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            disabled
            className="h-15 text-md flex items-center space-x-2 duration-500 dark:bg-indigo-800"
          >
            <Download size={14} />
            <span>Download</span>
          </Button>
          <Button
            variant="default"
            className="h-15 text-md flex items-center space-x-2 duration-500"
          >
            <span>Getting Started</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </section>
    </>
  );
};

export default Page;
