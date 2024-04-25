'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { leftPad } from '../../../lib/utils';
import { DetailedReservation } from '../../../utils/apis/types';
import PossibleBooking from './booking-prompt';
import CalendarDay from './calendar-day';
import CalendarDayView from './calendar-day-view';
import CalendarTimePopover from './calendar-time-popover';
import CalendarWeekView from './calendar-week-view';
import ExistingReservations from './existing-reservations';
import PossiblePlaceholder from './placeholder';
import {
    RelativeMousePositionProps,
    compareMousePositions,
    getDateAtMousePosition,
    weekDays,
} from '@/lib/utils';
import { add, format, setHours, setMinutes, startOfWeek } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CalendarProps {
    typeUUID: string;
    name: String;
    reservations: DetailedReservation[];
}

export default function Calendar({
    reservations,
    name,
    typeUUID,
}: CalendarProps) {
    const [relativeMousePosition, setRelativeMousePosition] =
        useState<RelativeMousePositionProps | null>(null);
    const [dragStart, setDragStart] =
        useState<RelativeMousePositionProps | null>(null);
    const [dragEnd, setDragEnd] = useState<RelativeMousePositionProps | null>(
        null,
    );
    const [currentDay, setCurrentDay] = useState<Date>(new Date());
    const [view, setView] = useState<'week' | 'day'>('week');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    function checkResizeWindow() {
        if (window.innerWidth < 900) {
            setView('day');
        } else {
            setView('week');
        }
    }

    useEffect(() => {
        checkResizeWindow();
        window.addEventListener('resize', checkResizeWindow);
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
        if (view == 'week') {
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
                setHours(
                    setMinutes(currentDay, dragStart.minutes),
                    dragStart.hours,
                ),
            );
            setEndDate(
                setHours(
                    setMinutes(currentDay, dateAtMousePosition.minutes),
                    dateAtMousePosition.hours,
                ),
            );
        }
    }

    function scrollAtEnds(e: React.MouseEvent<HTMLDivElement>) {
        if (e.clientY < 50) {
            window.scrollBy({
                top: 30,
                behavior: 'smooth',
            });
        } else if (e.clientY > window.innerHeight - 50) {
            window.scrollBy({
                top: 30,
                behavior: 'smooth',
            });
        }
    }

    return (
        <>
            <div
                className="w-full max-w-7xl flex flex-col mx-auto cursor-pointer select-none p-4"
                onMouseDown={scrollAtEnds}
            >
                <div className="flex justify-between pt-4 w-full items-center">
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <Select
                        value={view}
                        onValueChange={(val: 'day' | 'week') => setView(val)}
                    >
                        <SelectTrigger className="w-[180px] hidden md:flex ">
                            <SelectValue placeholder="Visningsmodus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Dagsvisning</SelectItem>
                            <SelectItem value="week">Ukesvisning</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {view === 'day' ? (
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
                    className="grid grid-cols-7 relative h-full rounded-md border box-border"
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
                                view == 'week'
                                    ? weekDays[relativeMousePosition.day]
                                    : format(currentDay, 'EEEE', { locale: nb })
                            }
                        />
                    )}
                    <PossiblePlaceholder
                        dragStart={dragStart!}
                        view={view}
                        relativeMousePosition={relativeMousePosition!}
                        visible={
                            (!dragEnd &&
                                dragStart &&
                                relativeMousePosition) as boolean
                        }
                    />
                    <ExistingReservations
                        setRelativeMousePosition={setRelativeMousePosition}
                        currentDay={currentDay}
                        view={view}
                        reservations={reservations}
                    />
                    <PossibleBooking
                        startDate={startDate}
                        endDate={endDate}
                        dragStart={dragStart!}
                        dragEnd={dragEnd!}
                        setRelativeMousePosition={setRelativeMousePosition}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                        view={view}
                        typeUUID={typeUUID}
                    />
                    {view == 'week' ? (
                        weekDays.map((_, index) => (
                            <CalendarDay key={index} index={index} />
                        ))
                    ) : (
                        <CalendarDay
                            className={'w-full col-span-7 border-none'}
                            key={0}
                            index={0}
                        />
                    )}
                </div>
            </div>
            <motion.div
                initial={{ y: '200%' }}
                animate={{ y: 0 }}
                transition={{
                    type: 'spring',
                    delay: 0.5,
                }}
                className="fixed bottom-5 right-12 z-20"
            >
                <Link href="/booking">
                    <Button className="h-20 w-20 rounded-full shadow-lg ">
                        <PlusIcon size={24} />
                    </Button>
                </Link>
            </motion.div>
        </>
    );
}
