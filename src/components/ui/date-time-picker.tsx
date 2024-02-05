"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { nb } from "date-fns/locale/nb"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerSection } from "@/components/ui/time-picker-section";
import { InputProps } from "@/components/ui/input";

export function DateTimePicker({ className, ...props }: InputProps) {
    const [date, setDate] = React.useState<Date>();

    const handleDateChange = (newDate?: Date) => {
        setDate(newDate);
        if (props.onChange) {
            const event = {
                target: {
                    value: newDate,
                },
                bubbles: true,
                cancelable: true,
                currentTarget: undefined,
                defaultPrevented: false,
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            props.onChange(event)
        }
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP HH:mm:ss", {
                        locale: nb
                    }) : <span>Velg dato og klokkeslett</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...props}
                    mode="single"
                    locale={nb}
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <TimePickerSection setDate={handleDateChange} date={date} />
                </div>
            </PopoverContent>
        </Popover>
    );
}
