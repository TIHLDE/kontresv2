'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { type InputProps } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { TimePickerSection } from '@/components/ui/time-picker-section';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

export function DateTimeRangePicker({
    className,
    timeFormat,
    setRange,
}: InputProps & {
    timeFormat?: string;
    range: DateRange | undefined;
    setRange: (range: DateRange | undefined) => void;
}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    const [startTime, setStartTime] = React.useState<Date | undefined>();
    const [endTime, setEndTime] = React.useState<Date | undefined>();

    React.useEffect(() => {
        if (date == undefined) return setRange(undefined);
        const from = date.from;
        const to = date.to;

        if (from && startTime) {
            from.setHours(startTime.getHours());
            from.setMinutes(startTime.getMinutes());
        }

        if (to && endTime) {
            to.setHours(endTime.getHours());
            to.setMinutes(endTime.getMinutes());
        }

        setRange(date);
    }, [date, startTime, endTime, setRange]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[300px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, timeFormat ?? 'd LLL, y')} -{' '}
                                {format(date.to, timeFormat ?? 'd LLL, y')}
                            </>
                        ) : (
                            format(date.from, timeFormat ?? 'd LLL, y')
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    initialFocus
                    mode="range"
                    locale={nb}
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                <div className="flex flex-row p-3 border-t border-border">
                    <TimePickerSection
                        setDate={setStartTime}
                        date={startTime}
                    />
                    <TimePickerSection setDate={setEndTime} date={endTime} />
                </div>
            </PopoverContent>
        </Popover>
    );
}
