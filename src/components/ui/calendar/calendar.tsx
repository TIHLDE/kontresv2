"use client";
import { useEffect, useState } from "react";
import { leftPad } from "../../../lib/utils";
import CalendarDay from "./calendar-day";
import CalendarTimePopover from "./calendar-time-popover";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getWeek, add, startOfWeek, format, getYear } from "date-fns";
import { nb } from "date-fns/locale/nb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalendarDayView from "./calendar-day-view";
import CalendarWeekView from "./calendar-week-view";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../button";
import { DateTimePicker } from "./date-time-picker";

const weekDays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

interface RelativeMousePositionProps {
  x: number;
  y: number;
  day: number;
  hours: number;
  minutes: number;
}
function getDateAtMousePosition<RelativeMousePositionProps>(
  e: React.MouseEvent<HTMLDivElement>,
) {
  const yPos = e.pageY - e.currentTarget.offsetTop;
  const xPos = e.pageX - e.currentTarget.offsetLeft;
  const height = e.currentTarget.clientHeight;
  const width = e.currentTarget.clientWidth;
  const day = Math.floor((xPos / width) * 7);
  const time = Math.floor((yPos / height) * 288);
  return {
    x: xPos,
    y: yPos,
    day,
    hours: Math.floor(time / 12),
    minutes: (time % 12) * 5,
  };
}

function compareMousePositions(
  a: RelativeMousePositionProps | null,
  b: RelativeMousePositionProps | null,
) {
  if (!a || !b) return false;
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.day === b.day &&
    a.hours === b.hours &&
    a.minutes === b.minutes
  );
}

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
    console.log(window.innerWidth);
    if (window.innerWidth < 900) {
      setView("day");
    }
  }, []);
  function updateRelativeMousePosition(e: React.MouseEvent<HTMLDivElement>) {
    setRelativeMousePosition(getDateAtMousePosition(e));
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
  }

  function PossiblePlaceholder() {
    return (
      !dragEnd &&
      dragStart &&
      relativeMousePosition && (
        <div
          className="rounded-md absolute bg-neutral-300 shadow-sm border z-10"
          style={{
            top: dragStart.y,
            left: view == "week" ? dragStart.day * (100 / 7) + "%" : "0",

            height: relativeMousePosition.y - dragStart.y,
            width: view == "week" ? 100 / 7 + "%" : "100%",
          }}
        ></div>
      )
    );
  }

  function PossibleBooking() {
    return (
      dragEnd &&
      dragStart && (
        <div
          className="rounded-md absolute bg-neutral-400 shadow-sm border z-10"
          style={{
            top: dragStart.y,
            left: view == "week" ? dragStart.day * (100 / 7) + "%" : "0",

            height: dragEnd.y - dragStart.y,
            width: view == "week" ? 100 / 7 + "%" : "100%",
          }}
        >
          <div className="relative h-full w-full">
            <div
              className="absolute top-full left-0 p-4 border rounded-md w-64 bg-white shadow-sm"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onMouseMove={(e) => {
                e.stopPropagation();
                setRelativeMousePosition(null);
              }}
            >
              <div className="text-sm text-neutral-500">Start:</div>
              <DateTimePicker
                date={startDate || new Date()}
                setDate={setStartDate}
              />
              <div className="text-sm text-neutral-500">Slutt:</div>
              <DateTimePicker
                date={endDate || new Date()}
                setDate={setEndDate}
              />
              <Button className="w-full">Reserver</Button>
            </div>
          </div>
        </div>
      )
    );
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
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      ) : (
        <CalendarWeekView
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
        <PossiblePlaceholder />
        <PossibleBooking />
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
