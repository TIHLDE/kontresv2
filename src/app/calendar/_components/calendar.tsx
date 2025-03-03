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

import { CalendarProvider, useCalendar } from './useCalendar';
import { DragProvider, useDrag } from './useDrag';
import { useClock } from '@/hooks/useClock';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import {
    addWeeks,
    eachDayOfInterval,
    endOfDay,
    format,
    getWeek,
    isSameDay,
    isToday,
    isWithinInterval,
    startOfDay,
    subWeeks,
} from 'date-fns';
import { nb } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, LucidePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

enum CalendarView {
    DAY = 'dag',
    THREE_DAYS = 'tre-dager',
    WEEK = 'uke',
}

const TIMESCALE_WIDTH = 60;
const HOUR_HEIGHT = 40;
const TOTAL_HEIGHT = 24 * HOUR_HEIGHT;

export default function Calendar({ id }: { id: number }) {
    const [itemId, setItemId] = useQueryState('id', parseAsInteger);
    const [activeId, setActiveId] = useState<number | null>(itemId ?? id);

    useEffect(() => {
        if (!itemId && id) {
            void setItemId(id);
        }
        if (itemId) {
            setActiveId(itemId);
        }
    }, [itemId, id, setItemId]);

    return (
        <CalendarProvider>
            <DragProvider>
                <Card className="flex-grow">
                    <CalendarHeader />
                    <CardContent className="flex flex-col w-full h-[calc(100%-94px)]">
                        {activeId ? (
                            <>
                                {' '}
                                <CalendarDayHeader />
                                <div className="flex overflow-y-auto">
                                    <CalendarTimescale />
                                    <CalendarContent id={activeId} />
                                </div>
                            </>
                        ) : (
                            <div className="flex w-full h-full justify-center items-center">
                                <h3 className="text-2xl font-bold">
                                    Velg en gjendstand
                                </h3>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </DragProvider>
        </CalendarProvider>
    );
}

function CalendarHeader() {
    const { start, end, view, setView, handleNext, handlePrevious } =
        useCalendar();

    const formatDateRange = useCallback(() => {
        switch (view as CalendarView) {
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
        <CardHeader className="flex flex-row justify-between items-center sticky top-0 bg-card z-20">
            <CardTitle>Calendar</CardTitle>
            <div className="flex justify-center items-center gap-2">
                <Button size="icon" variant="outline" onClick={handlePrevious}>
                    <ChevronLeft />
                </Button>
                <span className="text-lg font-semibold capitalize hidden lg:block">
                    {formatDateRange()}
                </span>
                <Button size="icon" variant="outline" onClick={handleNext}>
                    <ChevronRight />
                </Button>
                <Select
                    value={view}
                    onValueChange={(v) => setView(v as CalendarView)}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={CalendarView.DAY}>I dag</SelectItem>
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

function CalendarDayHeader() {
    const { start, end } = useCalendar();

    const days = eachDayOfInterval({ start, end });

    return (
        <div
            style={{ paddingLeft: TIMESCALE_WIDTH }}
            className="flex w-full border-b"
        >
            {days.map((day) => (
                <h3
                    key={day.toISOString()}
                    className="text-2xl font-bold w-full p-2"
                >
                    {format(day, 'EEE dd', { locale: nb })}
                </h3>
            ))}
        </div>
    );
}

function CalendarTimescale() {
    return (
        <div
            style={{ width: TIMESCALE_WIDTH, height: TOTAL_HEIGHT }}
            className="border-r"
        >
            {Array.from({ length: 24 }, (_, i) => (
                <div
                    key={i}
                    style={{ height: HOUR_HEIGHT, minHeight: HOUR_HEIGHT }}
                    className="flex justify-center items-start border-b text-sm text-muted-foreground"
                >
                    {String(i).padStart(2, '0')}:00
                </div>
            ))}
        </div>
    );
}

function CalendarContent({ id }: { id: number }) {
    const { start, end } = useCalendar();
    const { handleDragStart, handleDragMove, handleDragEnd, dragState } =
        useDrag();
    const router = useRouter();

    const days = eachDayOfInterval({ start, end });

    const fetchRange = useMemo(() => {
        return {
            start: subWeeks(startOfDay(start), 2),
            end: addWeeks(endOfDay(end), 2),
        };
    }, [start, end]);

    const { data: reservations } =
        api.reservation.getReservationsByBookableItemId.useQuery({
            bookableItemId: id,
            startDate: fetchRange.start,
            endDate: fetchRange.end,
        });

    const events: Event[] =
        reservations?.reservations.map((reservation) => ({
            id: reservation.reservationId,
            title: reservation.authorId,
            start: new Date(reservation.startTime),
            end: new Date(reservation.endTime),
        })) ?? [];

    const getTimeFromMouseEvent = (e: React.MouseEvent, day: Date) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;

        const totalMinutes = Math.floor((y / HOUR_HEIGHT) * 60);
        const snappedMinutes = Math.floor(totalMinutes / 30) * 30;
        const hours = Math.floor(snappedMinutes / 60);
        const minutes = snappedMinutes % 60;

        return new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            hours,
            minutes,
        );
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        const isEvent =
            target.hasAttribute('data-event-id') ||
            target.parentElement?.hasAttribute('data-event-id');

        if (isEvent) return;

        const columnEl = target.closest('[data-day]');
        if (!columnEl) return;

        const day = new Date(columnEl.getAttribute('data-day')!);
        const time = getTimeFromMouseEvent(e, day);
        handleDragStart(time);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!e.buttons) return;
        const target = e.target as HTMLElement;
        const columnEl = target.closest('[data-day]');
        if (!columnEl) return;

        const day = new Date(columnEl.getAttribute('data-day')!);
        const time = getTimeFromMouseEvent(e, day);
        handleDragMove(time);
    };

    const handleMouseUp = () => {
        if (!dragState?.isDragging) {
            handleDragEnd();
            return;
        }

        handleDragEnd();

        if (
            dragState.isDragging &&
            dragState?.endDate.getTime() !== dragState?.startDate.getTime()
        ) {
            router.push(`booking/${id}/new`);
        }
    };

    return (
        <div
            style={{ height: TOTAL_HEIGHT }}
            className={cn(
                'flex w-full relative',
                dragState?.isDragging && 'select-none',
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleDragEnd}
        >
            {days.map((day) => (
                <CalendarDayColumn
                    key={day.toISOString()}
                    day={day}
                    events={events}
                />
            ))}
            <Button
                className="fixed z-30 right-4 bottom-4 w-12 h-12"
                size="icon"
                onClick={() => router.push(`booking/${id}/new`)}
            >
                <LucidePlus size={32} />
            </Button>
        </div>
    );
}

export function DragOverlay({ day }: { day: Date }) {
    const { dragState } = useDrag();

    if (!dragState) return null;

    if (dragState.startDate.getTime() === dragState.endDate.getTime())
        return null;

    const [earlierDate, laterDate] = [dragState.startDate, dragState.endDate]
        .slice()
        .sort((a, b) => a.getTime() - b.getTime()) as [Date, Date];

    const isWithinDrag = isWithinInterval(startOfDay(day), {
        start: startOfDay(earlierDate),
        end: startOfDay(laterDate),
    });

    if (!isWithinDrag) return null;

    let top = 0;
    let height = TOTAL_HEIGHT;

    if (isSameDay(day, earlierDate)) {
        const minutes = earlierDate.getHours() * 60 + earlierDate.getMinutes();
        top = Math.min((minutes / 60) * HOUR_HEIGHT, TOTAL_HEIGHT);
    }

    if (isSameDay(day, laterDate)) {
        const minutes = laterDate.getHours() * 60 + laterDate.getMinutes();
        height = Math.min((minutes / 60) * HOUR_HEIGHT, TOTAL_HEIGHT);
    }

    if (isSameDay(earlierDate, laterDate)) {
        height = Math.min(height - top, TOTAL_HEIGHT - top);
    }

    if (top + height > TOTAL_HEIGHT) {
        height = TOTAL_HEIGHT - top;
    }

    const borderRadiusClass =
        isSameDay(day, earlierDate) && isSameDay(day, laterDate)
            ? 'rounded-md'
            : isSameDay(day, earlierDate)
              ? 'rounded-t-md'
              : isSameDay(day, laterDate)
                ? 'rounded-b-md'
                : '';

    const isStartDay = isSameDay(day, earlierDate);
    const isEndDay = isSameDay(day, laterDate);

    const positionStyle = {
        top: isStartDay ? top + 4 : top,
        height:
            isStartDay && isEndDay
                ? height - 8
                : isStartDay || isEndDay
                  ? height - 4
                  : height,
    };

    return (
        <div
            className={cn(
                `absolute z-10 left-1 right-1 bg-primary/20 hover:bg-primary/30 hover:cursor-pointer border-l-4 border-l-primary p-2`,
                borderRadiusClass,
                dragState?.isDragging && 'pointer-events-none',
            )}
            style={positionStyle}
        />
    );
}

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export function EventOverlay({ day, events }: { day: Date; events: Event[] }) {
    const { dragState } = useDrag();
    const router = useRouter();

    const dayEvents = events.filter(
        (event) => isSameDay(day, event.start) || isSameDay(day, event.end),
    );

    if (dayEvents.length === 0) return null;

    return (
        <>
            {dayEvents.map((event) => {
                let top = 0;
                let height = TOTAL_HEIGHT;

                if (isSameDay(day, event.start)) {
                    const minutes =
                        event.start.getHours() * 60 + event.start.getMinutes();
                    top = Math.min((minutes / 60) * HOUR_HEIGHT, TOTAL_HEIGHT);
                }

                if (isSameDay(day, event.end)) {
                    const minutes =
                        event.end.getHours() * 60 + event.end.getMinutes();
                    height = Math.min(
                        (minutes / 60) * HOUR_HEIGHT,
                        TOTAL_HEIGHT,
                    );
                }

                if (isSameDay(event.start, event.end)) {
                    height = Math.min(height - top, TOTAL_HEIGHT - top);
                }

                if (top + height > TOTAL_HEIGHT) {
                    height = TOTAL_HEIGHT - top;
                }

                const borderRadiusClass =
                    isSameDay(day, event.start) && isSameDay(day, event.end)
                        ? 'rounded-md'
                        : isSameDay(day, event.start)
                          ? 'rounded-t-md'
                          : isSameDay(day, event.end)
                            ? 'rounded-b-md'
                            : '';

                const isStartDay = isSameDay(day, event.start);
                const isEndDay = isSameDay(day, event.end);

                const positionStyle = {
                    top: isStartDay ? top + 4 : top,
                    height:
                        isStartDay && isEndDay
                            ? height - 8
                            : isStartDay || isEndDay
                              ? height - 4
                              : height,
                };

                return (
                    <div
                        key={event.id}
                        data-event-id={event.id}
                        className={cn(
                            `absolute z-10 left-1 right-1 bg-primary/20 hover:bg-primary/30 hover:cursor-pointer duration-150 border-l-4 border-l-primary p-2`,
                            borderRadiusClass,
                            dragState?.isDragging && 'pointer-events-none',
                        )}
                        style={positionStyle}
                        onClick={() => router.push(`reservation/${event.id}`)}
                    >
                        <span className="text-sm font-medium select-none">
                            {event.title}
                        </span>
                    </div>
                );
            })}
        </>
    );
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
    const topPosition = (minutesSinceStartOfDay / 60) * HOUR_HEIGHT;

    const style = {
        top: `${topPosition}px`,
    };

    return (
        <div
            ref={indicatorRef}
            className="border-red-500 z-30 border-t border-b w-full absolute scroll-m-40 duration-150"
            style={style}
        ></div>
    );
}

function CalendarDayColumn({ day, events }: { day: Date; events: Event[] }) {
    return (
        <div
            data-day={day.toISOString()}
            style={{ height: TOTAL_HEIGHT }}
            className="flex flex-col w-full border-r relative"
        >
            {Array.from({ length: 24 }, (_, i) => (
                <CalendarHourCell key={i} />
            ))}
            <DragOverlay day={day} />
            <EventOverlay day={day} events={events} />
            {isToday(day) && <CurrentTimeIndicator />}
        </div>
    );
}

function CalendarHourCell() {
    return (
        <div
            style={{ height: HOUR_HEIGHT, minHeight: HOUR_HEIGHT }}
            className="relative border-b"
        >
            <span className="absolute top-1/2 -translate-y-1/2 w-full border-t border-dashed" />
        </div>
    );
}
