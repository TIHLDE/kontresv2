export default function CalendarTimePopover({
  day,
  position,
  timeStart,
  timeEnd,
}: {
  day: string;
  position: { x: number; y: number };
  timeStart: string;
  timeEnd: string | null;
}) {
  return (
    <div
      className="z-20 absolute pointer-events-none border shadow-md text-sm bg-white rounded-md px-4 py-2 -translate-x-1/2 -translate-y-full"
      style={{ top: position.y, left: position.x }}
    >
      {day + " " + timeStart}
      {timeEnd && " - " + timeEnd}
    </div>
  );
}
