'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { DragProvider, useDrag } from './drag-context';
import { DragOverlay, EventsOverlay } from './overlay';
import { useClock } from '@/hooks/useClock';
import {
    addDays,
    addWeeks,
    eachDayOfInterval,
    endOfDay,
    endOfWeek,
    format,
    getWeek,
    isSameDay,
    isToday,
    isWithinInterval,
    startOfDay,
    startOfWeek,
} from 'date-fns';
import { nb } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

enum CalendarView {
    DAY = 'day',
    THREE_DAYS = 'threeDays',
    WEEK = 'week',
}

export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color?: string;
}

export default function Calendar({ events }: { events: Event[] }) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [view, setView] = useState<CalendarView>(CalendarView.WEEK);

    const getDateRange = useCallback(() => {
        switch (view) {
            case CalendarView.DAY:
                return {
                    start: startOfDay(currentDate),
                    end: endOfDay(currentDate),
                };
            case CalendarView.THREE_DAYS:
                return {
                    start: startOfDay(currentDate),
                    end: endOfDay(addDays(currentDate, 2)),
                };
            case CalendarView.WEEK:
                return {
                    start: startOfWeek(currentDate, { locale: nb }),
                    end: endOfWeek(currentDate, { locale: nb }),
                };
        }
    }, [currentDate, view]);

    const { start, end } = getDateRange();

    return (
        <Card className="flex-grow overflow-auto">
            <CalendarHeader
                setCurrentDate={setCurrentDate}
                view={view}
                setView={setView}
                start={start}
                end={end}
            />
            <DragProvider>
                <CalendarContent start={start} end={end} events={events} />
            </DragProvider>
        </Card>
    );
}

function CalendarHeader({
    setCurrentDate,
    view,
    setView,
    start,
    end,
}: {
    setCurrentDate: (date: (date: Date) => Date) => void;
    view: CalendarView;
    setView: (view: CalendarView) => void;
    start: Date;
    end: Date;
}) {
    const handleNext = () => {
        switch (view) {
            case CalendarView.DAY:
                setCurrentDate((d) => addDays(d, 1));
                break;
            case CalendarView.THREE_DAYS:
                setCurrentDate((d) => addDays(d, 3));
                break;
            case CalendarView.WEEK:
                setCurrentDate((d) => addWeeks(d, 1));
                break;
        }
    };

    const handlePrevious = () => {
        switch (view) {
            case CalendarView.DAY:
                setCurrentDate((d) => addDays(d, -1));
                break;
            case CalendarView.THREE_DAYS:
                setCurrentDate((d) => addDays(d, -3));
                break;
            case CalendarView.WEEK:
                setCurrentDate((d) => addWeeks(d, -1));
                break;
        }
    };

    const formatDateRange = useCallback(() => {
        switch (view) {
            case CalendarView.DAY:
                return format(start, 'EEE d. MMM', { locale: nb });
            case CalendarView.THREE_DAYS:
                return `${format(start, 'd.', { locale: nb })} - ${format(end, 'd. MMM', { locale: nb })}`;
            case CalendarView.WEEK:
                const weekNumber = getWeek(start, { locale: nb });
                return `Uke ${weekNumber} (${format(start, 'd. MMM', { locale: nb })} - ${format(end, 'd. MMM', { locale: nb })})`;
        }
    }, [view, start, end]);

    return (
        <CardHeader className="flex flex-row justify-between items-center sticky top-0 bg-card z-10">
            <CardTitle>Calendar</CardTitle>
            <div className="flex justify-center items-center gap-2">
                <Button size="icon" variant="outline" onClick={handlePrevious}>
                    <ChevronLeft />
                </Button>
                <span className="text-lg font-semibold capitalize">
                    {formatDateRange()}
                </span>
                <Button size="icon" variant="outline" onClick={handleNext}>
                    <ChevronRight />
                </Button>
                <Select
                    value={view}
                    onValueChange={(v) => setView(v as CalendarView)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={CalendarView.DAY}>Dag</SelectItem>
                        <SelectItem value={CalendarView.THREE_DAYS}>
                            3 dager
                        </SelectItem>
                        <SelectItem value={CalendarView.WEEK}>Uke</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
    );
}

function CalendarContent({
    start,
    end,
    events,
}: {
    start: Date;
    end: Date;
    events: Event[];
}) {
    return (
        <CardContent className="flex flex-row">
            <TimeScale />
            <DayGrid start={start} end={end} events={events} />
        </CardContent>
    );
}

function TimeScale() {
    return (
        <div className="flex flex-col w-16 border-r">
            <div className="h-12"></div>
            {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="h-20 relative">
                    <span className="absolute -translate-y-1/2">
                        {String(i).padStart(2, '0')}:00
                    </span>
                </div>
            ))}
        </div>
    );
}

function DayHeader({ day }: { day: Date }) {
    return (
        <div>
            <div className="h-12 border-b border-r capitalize flex justify-center items-center font-bold text-lg">
                {format(day, 'EEE dd', { locale: nb })}
            </div>
        </div>
    );
}

function HourCell() {
    return <div className="h-20 border-b border-r"></div>;
}

function CurrentTimeIndicator() {
    const indicatorRef = useRef<HTMLDivElement>(null);
    const [now, setNow] = useState(new Date());

    const scrollToIndicator = useCallback(() => {
        if (indicatorRef.current) {
            indicatorRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, []);

    useEffect(() => {
        scrollToIndicator();
    }, [scrollToIndicator]);

    useClock(() => setNow(new Date()));

    const minutesSinceStartOfDay = now.getHours() * 60 + now.getMinutes();
    const topPosition = (minutesSinceStartOfDay / 60) * 80;

    const style = {
        top: `${topPosition}px`,
    };

    return (
        <div
            ref={indicatorRef}
            className="border-red-500 border-t border-b w-full absolute scroll-m-40"
            style={style}
        ></div>
    );
}

function DayColumn({ day, events }: { day: Date; events: Event[] }) {
    const today = isToday(day);
    const { onDragStart, onDragMove, onDragEnd } = useDrag();

    return (
        <div className="flex flex-col w-full select-none relative">
            <DayHeader day={day} />
            <div
                className="relative"
                onMouseDown={(e) => onDragStart(day, e)}
                onMouseMove={(e) => onDragMove(day, e)}
                onMouseUp={onDragEnd}
            >
                {Array.from({ length: 24 }, (_, i) => (
                    <HourCell key={i} />
                ))}

                {today && <CurrentTimeIndicator />}
                <DragOverlay day={day} />
                <EventsOverlay day={day} events={events} />
            </div>
        </div>
    );
}

function DayGrid({
    start,
    end,
    events,
}: {
    start: Date;
    end: Date;
    events: Event[];
}) {
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="flex w-full relative">
            {days.map((day) => (
                <DayColumn key={day.toISOString()} day={day} events={events} />
            ))}
        </div>
    );
}
