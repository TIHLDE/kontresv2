'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { type DetailedReservation } from '../../../utils/apis/types';
import PossibleBooking from './booking-prompt';
import CalendarDay from './calendar-day';
import CalendarDayView from './calendar-day-view';
import CalendarTimePopover from './calendar-time-popover';
import CalendarWeekView from './calendar-week-view';
import ExistingReservations from './existing-reservations';
import PossiblePlaceholder from './placeholder';
import { weekDays } from '@/lib/utils';
import { setDay, setHours, setMinutes, setSeconds } from 'date-fns';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface CalendarProps {
    typeUUID: string;
    name: string;
    reservations: DetailedReservation[];
}

export default function Calendar({
    reservations,
    name,
    typeUUID,
}: CalendarProps) {
    const [mousePosition, setMousePosition] = useState<React.MouseEvent<
        HTMLDivElement,
        MouseEvent
    > | null>(null);
    const [currentDay, setCurrentDay] = useState(new Date());
    const [view, setView] = useState<'day' | 'week'>('week');
    const [dragStart, setDragStart] = useState<React.MouseEvent<
        HTMLDivElement,
        MouseEvent
    > | null>(null);
    const [dragEnd, setDragEnd] = useState<React.MouseEvent<
        HTMLDivElement,
        MouseEvent
    > | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    function resetChoice() {
        setDragStart(null);
        setDragEnd(null);
        setStartDate(null);
        setEndDate(null);
    }

    useEffect(() => {
        //if window is resized to be smaller than 900 px, change view to day, on resize event
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setView('day');
            }
        };
        window.addEventListener('resize', handleResize);
    }, []);

    function updateDragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (dragStart && dragEnd) {
            setDragStart(null);
            setDragEnd(null);
        } else if (dragStart) {
            setDragEnd(e);
        } else {
            setDragStart(e);
        }
    }

    function updateDragEnd(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (dragStart && !dragEnd) {
            setDragEnd(e);
            setStartDate(
                setDay(
                    setHours(
                        setMinutes(
                            setSeconds(currentDay, 0),
                            Math.floor(
                                (dragStart.nativeEvent.offsetY /
                                    (dragStart.target as HTMLDivElement)
                                        .offsetHeight) *
                                    60,
                            ),
                        ),
                        Math.floor(
                            ((dragStart.pageY -
                                containerRef.current!.offsetTop) /
                                containerRef.current!.offsetHeight) *
                                24,
                        ),
                    ),
                    view == 'week'
                        ? Math.floor(
                              (dragStart.pageX / window.innerWidth) * 7,
                          ) + 1
                        : currentDay.getDay(),
                    { weekStartsOn: 0 },
                ),
            );
            setEndDate(
                setDay(
                    setHours(
                        setMinutes(
                            setSeconds(currentDay, 0),
                            Math.floor(
                                (e.nativeEvent.offsetY /
                                    (e.target as HTMLDivElement).offsetHeight) *
                                    60,
                            ),
                        ),
                        Math.floor(
                            ((e.pageY - containerRef.current!.offsetTop) /
                                containerRef.current!.offsetHeight) *
                                24,
                        ),
                    ),
                    view == 'week'
                        ? Math.floor(
                              (dragStart.pageX / window.innerWidth) * 7,
                          ) + 1
                        : currentDay.getDay(),
                    { weekStartsOn: 0 },
                ),
            );
        } else {
            setDragStart(null);
        }
    }

    return (
        <>
            <div className="w-full max-w-7xl flex flex-col mx-auto cursor-pointer select-none p-4">
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
                    onMouseMove={(e) => setMousePosition(e)}
                    onMouseLeave={(e) => {
                        setMousePosition(null);
                        if (dragStart && !dragEnd) {
                            resetChoice();
                        }
                    }}
                    onMouseDown={updateDragStart}
                    onMouseUp={updateDragEnd}
                    ref={containerRef}
                >
                    {mousePosition && (
                        <CalendarTimePopover
                            mousePosition={mousePosition}
                            currentDay={currentDay}
                            view={view}
                            containerRef={containerRef}
                        />
                    )}
                    <PossiblePlaceholder
                        dragStart={dragStart}
                        dragEnd={dragEnd}
                        view={view}
                        mousePosition={mousePosition}
                        containerRef={containerRef}
                    />
                    <ExistingReservations
                        setRelativeMousePosition={setMousePosition}
                        currentDay={currentDay}
                        view={view}
                        reservations={reservations}
                    />
                    <PossibleBooking
                        containerRef={containerRef}
                        startDate={startDate}
                        endDate={endDate}
                        dragStart={dragStart}
                        dragEnd={dragEnd}
                        setRelativeMousePosition={setMousePosition}
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
