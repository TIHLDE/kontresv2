"use client";
import { cn } from "../../../lib/utils";



export default function CalendarDay({
  index,
  className,
}: {
  index: number;
  className?: String;
}) {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-stretch",
        index !== 6 ? "border-r" : "",
        className,
      )}
    >
      <div className="h-full"></div>
    </div>
  );
}
