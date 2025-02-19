import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ToolbarItemProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

export function ToolbarItem({ icon, tooltip, onClick }: ToolbarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-sm hover:bg-indigo-50" onClick={onClick}>
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}