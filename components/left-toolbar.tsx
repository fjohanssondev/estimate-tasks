import { MousePointer, Square, StickyNote, Timer, Type } from "lucide-react";
import { ToolbarItem } from "./toolbar-item";

export function LeftToolbar({ action }: Readonly<{ action: () => void }>) {
  return (
    <div className="absolute z-50 w-12 h-auto py-1 left-4 top-1/2 transform -translate-y-1/2 bg-white shadow border flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-1">
        <ToolbarItem
          icon={<Timer strokeWidth={1.5} stroke="#000" />}
          tooltip="Timer"
          onClick={() => { console.log("Test") }}
        />
        <div className="block py-1">
          <div className="w-full border border-zinc-300"></div>
        </div>
        <ToolbarItem
          icon={<MousePointer strokeWidth={1.5} stroke="#000" />}
          tooltip="Pointer"
          onClick={() => { console.log("Test") }}
        />
        <ToolbarItem
          icon={<Type strokeWidth={1.5} stroke="#000" />}
          tooltip="Text"
          onClick={() => { console.log("Test") }}
        />
        <ToolbarItem
          icon={<Square strokeWidth={1.5} stroke="#000" />}
          tooltip="Rectangle"
          onClick={action}
        />
        <ToolbarItem
          icon={<StickyNote strokeWidth={1.5} stroke="#000" />}
          tooltip="Sticky Note"
          onClick={() => { console.log("Test") }}
        />
      </div>
    </div>
  )
}