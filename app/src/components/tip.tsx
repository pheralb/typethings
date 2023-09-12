import { Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TipProps {
  text: string;
  iconSize?: number;
}

const Tip = (props: TipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.5}>
        <TooltipTrigger asChild className="cursor-help text-neutral-300 transition-colors duration-300 hover:text-yellow-400">
          <Lightbulb size={props.iconSize || 16} />
        </TooltipTrigger>
        <TooltipContent
          avoidCollisions
          hideWhenDetached
          sideOffset={5}
          className="max-w-xs cursor-default"
        >
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Tip;
