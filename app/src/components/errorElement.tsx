import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import { exit, relaunch } from "@tauri-apps/api/process";

import { Button, buttonVariants, ExternalLink } from "@typethings/ui";
import { AlertTriangle, ArrowUpRight, LogOut, RefreshCw } from "lucide-react";

import { type OSInfo, getOSInfo } from "@/functions/getAllPlatformInfo";

const ErrorElement = () => {
  const error = useRouteError() as any;
  const [platform, setPlatform] = useState<OSInfo>();

  useEffect(() => {
    const handle = async () => {
      const platform = await getOSInfo();
      setPlatform(platform!);
    };
    handle();
  }, []);

  return (
    <div className="bg-[url('/grid/grid-dark.svg')]">
      <div className="mx-auto flex h-screen flex-col items-center justify-center">
        <div className="w-96 rounded-lg border bg-neutral-900 p-4 shadow-sm transition hover:shadow-lg sm:p-6">
          <div className="mb-3 flex flex-col space-y-3 border-b border-neutral-800 pb-3">
            <AlertTriangle className="text-red-400" size={22} />
            <h3 className="text-xl font-medium">Something went wrong.</h3>
          </div>
          <div className="mb-1 flex flex-col space-y-2 pb-3">
            <p className="text-sm text-neutral-400">Error:</p>
            <textarea
              className="mt-3 h-16 w-full resize-none rounded-sm bg-red-400/5 p-2 text-sm/relaxed text-red-400 focus:outline-none focus:ring-0"
              value={error.data as string}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-2 border-b border-neutral-800 pb-3">
            <p className="text-sm text-neutral-400">OS info:</p>
            <ol>
              <li className="text-sm text-neutral-300">
                <span className="font-medium">Platform:</span>{" "}
                {platform?.osType} - {platform?.platform}
              </li>
              <li className="text-sm text-neutral-300">
                <span className="font-medium">Version:</span>{" "}
                {platform?.kernelVersion}
              </li>
              <li className="text-sm text-neutral-300">
                <span className="font-medium">Architecture:</span>{" "}
                {platform?.architecture}
              </li>
            </ol>
          </div>
          <div className="mt-4 flex items-center space-x-1">
            <Button
              className="flex w-full items-center space-x-2"
              onClick={async () => {
                await exit(0);
              }}
            >
              <LogOut size={16} />
              <span>Exit</span>
            </Button>
            <Button
              className="flex w-full items-center space-x-2"
              onClick={async () => {
                await relaunch();
              }}
            >
              <RefreshCw size={16} />
              <span>Reload</span>
            </Button>
            <ExternalLink
              className={buttonVariants({
                className: "flex w-full items-center space-x-2",
              })}
              href="https://github.com/pheralb/typethings/issues/new"
            >
              <span>Report</span>
              <ArrowUpRight size={16} />
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
