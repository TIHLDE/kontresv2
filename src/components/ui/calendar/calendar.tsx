"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { add, format, startOfWeek } from "date-fns";
import { nb } from "date-fns/locale/nb";
import { useEffect, useState } from "react";
import { leftPad } from "../../../lib/utils";
import PossibleBooking from "./booking-prompt";
import CalendarDay from "./calendar-day";
import CalendarDayView from "./calendar-day-view";
import CalendarTimePopover from "./calendar-time-popover";
import CalendarWeekView from "./calendar-week-view";

import { RelativeMousePositionProps, compareMousePositions, getDateAtMousePosition, weekDays } from "@/lib/utils";
import { setHours, setMinutes } from "date-fns";
import PossiblePlaceholder from "./placeholder";

export default function Calendar() {
  const [relativeMousePosition, setRelativeMousePosition] =
    useState<RelativeMousePositionProps | null>(null);
  const [dragStart, setDragStart] = useState<RelativeMousePositionProps | null>(
    null,
  );
  const [dragEnd, setDragEnd] = useState<RelativeMousePositionProps | null>(
    null,
  );
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [view, setView] = useState<"week" | "day">("week");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setView("day");
    }
  }, []);
  function updateRelativeMousePosition(e: React.MouseEvent<HTMLDivElement>) {
    setRelativeMousePosition(getDateAtMousePosition(e));
  }

  function resetChoice() {
    setDragStart(null);
    setDragEnd(null);
    setStartDate(null);
    setEndDate(null);
  }

  function updateDragStart(e: React.MouseEvent<HTMLDivElement>) {
    setDragEnd(null);
    setDragStart(getDateAtMousePosition(e));
  }

  function updateDragEnd(e: React.MouseEvent<HTMLDivElement>) {
    if (!dragStart) return;
    let dateAtMousePosition = getDateAtMousePosition(e);
    if (compareMousePositions(dateAtMousePosition, dragStart)) {
      setDragStart(null);
      setDragEnd(null);
      return;
    }
    if (dateAtMousePosition.hours > 23) {
      dateAtMousePosition.hours = 23;
      dateAtMousePosition.minutes = 59;
    }
    if (dateAtMousePosition.y > e.currentTarget.offsetHeight) {
      dateAtMousePosition.y = e.currentTarget.offsetHeight;
    }
    setDragEnd(dateAtMousePosition);
    if (view == "week") {
      setStartDate(
        add(startOfWeek(currentDay, { weekStartsOn: 1 }), {
          days: dragStart.day,
          hours: dragStart.hours,
          minutes: dragStart.minutes,
        }),
      );
      setEndDate(
        add(startOfWeek(currentDay, { weekStartsOn: 1 }), {
          days: dateAtMousePosition.day,
          hours: dateAtMousePosition.hours,
          minutes: dateAtMousePosition.minutes,
        }),
      );
    } else {
      setStartDate(
        setHours(setMinutes(currentDay, dragStart.minutes), dragStart.hours),
      );
      setEndDate(
        setHours(
          setMinutes(currentDay, dateAtMousePosition.minutes),
          dateAtMousePosition.hours,
        ),
      );
    }
  }



  return (
    <div className="w-full h-[200vh] max-w-7xl flex flex-col mx-auto cursor-pointer select-none">
      <div className="flex justify-end pt-4">
        <Select
          value={view}
          onValueChange={(val: "day" | "week") => setView(val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Visningsmodus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Dagsvisning</SelectItem>
            <SelectItem value="week">Ukesvisning</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {view === "day" ? (
        <CalendarDayView
          resetChoice={resetChoice}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      ) : (
        <CalendarWeekView
          resetChoice={resetChoice}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      )}
      <div
        className="grid grid-cols-7 relative h-full rounded-md border"
        onMouseMove={updateRelativeMousePosition}
        onMouseLeave={(e) => {
          setRelativeMousePosition(null);
          if (dragStart && !dragEnd) {
            updateDragEnd(e);
          }
        }}
        onMouseDown={updateDragStart}
        onMouseUp={updateDragEnd}
      >
        {relativeMousePosition && (
          <CalendarTimePopover
            timeStart={
              dragStart && !dragEnd
                ? `${leftPad(dragStart.hours, 2)}:${leftPad(
                    dragStart.minutes,
                    2,
                  )}`
                : `${leftPad(relativeMousePosition.hours, 2)}:${leftPad(
                    relativeMousePosition.minutes,
                    2,
                  )}`
            }
            timeEnd={
              dragStart && !dragEnd
                ? `${leftPad(relativeMousePosition.hours, 2)}:${leftPad(
                    relativeMousePosition.minutes,
                    2,
                  )}`
                : null
            }
            position={{
              x: relativeMousePosition.x,
              y: relativeMousePosition.y,
            }}
            day={
              view == "week"
                ? weekDays[relativeMousePosition.day]
                : format(currentDay, "EEEE", { locale: nb })
            }
          />
        )}
        <PossiblePlaceholder dragStart={dragStart!} view={view} relativeMousePosition={relativeMousePosition!} visible={
      (!dragEnd &&
      dragStart &&
      relativeMousePosition) as boolean
          } />
        <PossibleBooking
        startDate={startDate}
        endDate={endDate}
        dragStart={dragStart!}
        dragEnd={dragEnd!}
        setRelativeMousePosition={setRelativeMousePosition}
        setEndDate={setEndDate}
        setStartDate={setStartDate} 
        view={view}
        />
        {view == "week" ? (
          weekDays.map((_, index) => <CalendarDay key={index} index={index} />)
        ) : (
          <CalendarDay
            className={"w-full col-span-7 border-none"}
            key={0}
            index={0}
          />
        )}
      </div>
    </div>
  );
}
