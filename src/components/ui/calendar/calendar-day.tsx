"use client";
import { cn } from "../../../lib/utils";

const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

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
