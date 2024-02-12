import { RelativeMousePositionProps } from "@/lib/utils";

  export default function PossiblePlaceholder({visible, dragStart, relativeMousePosition, view}: {visible: boolean, dragStart:RelativeMousePositionProps, relativeMousePosition: RelativeMousePositionProps, view: "week" | "day"}){
    if (!dragStart || !relativeMousePosition) return null;
    return (
        visible && <div
          className="rounded-md absolute bg-neutral-300 shadow-sm border z-10"
          style={{
            top: dragStart.y,
            left: view == "week" ? dragStart.day * (100 / 7) + "%" : "0",

            height: relativeMousePosition.y - dragStart.y,
            width: view == "week" ? 100 / 7 + "%" : "100%",
          }}
        ></div>
      )
  }
