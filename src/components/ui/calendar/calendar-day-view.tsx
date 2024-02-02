import { add, format } from "date-fns";
import { nb } from "date-fns/locale/nb";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function CalendarDayView({
  currentDay,
  setCurrentDay,
}: {
  currentDay: Date;
  setCurrentDay: (date: Date) => void;
}) {
  return (
    <div className="flex w-full justify-center gap-4 py-2">
      <button
        onClick={() => {
          setCurrentDay(add(currentDay, { days: -1 }));
        }}
      >
        <ChevronLeftIcon />
      </button>
      <h3 className="text-2xl font-medium">
        {format(currentDay, "dd. MMMM yyyy", { locale: nb })}
      </h3>
      <button
        onClick={() => {
          setCurrentDay(add(currentDay, { days: 1 }));
        }}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
