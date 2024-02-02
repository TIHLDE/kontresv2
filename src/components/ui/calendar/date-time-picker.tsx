import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { nb } from "date-fns/locale/nb";
import {
  format,
  setDay as setD,
  setHours,
  setMinutes,
  setMonth,
  setYear,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../calendar";
import { Input } from "../input";

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [newDate, setNewDate] = React.useState<Date>(date);
  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start pb-2 flex mb-2 text-left font-normal",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(newDate, "HH:mm dd. MMMM yyyy", { locale: nb }) ||
            "Velg dato"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={newDate}
          onSelect={(val) => {
            if (val)
              setNewDate(
                setHours(setMinutes(val, date.getMinutes()), date.getHours()),
              );
          }}
        />
        <span className="p-2 text-sm">Klokkeslett:</span>
        <div className="flex gap-1 p-2 items-center">
          <Input
            type="number"
            min="0"
            max="23"
            className="w-20"
            onChange={(e) => {
              setNewDate(setHours(date, e.target.valueAsNumber));
            }}
            value={format(newDate, "HH")}
          />
          :
          <Input
            type="number"
            min={"0"}
            max={"59"}
            className="w-20"
            onChange={(e) => {
              setNewDate(setMinutes(date, e.target.valueAsNumber));
            }}
            value={format(newDate, "mm")}
          />
        </div>
        <Button className="w-full" onClick={() => setDate(newDate)}>
          Lagre
        </Button>
      </PopoverContent>
    </Popover>
  );
}
