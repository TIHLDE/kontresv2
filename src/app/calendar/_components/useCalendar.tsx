'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import {
    addDays,
    addWeeks,
    endOfDay,
    endOfWeek,
    startOfDay,
    startOfWeek,
} from 'date-fns';
import { nb } from 'date-fns/locale';
import { parseAsIsoDate, parseAsStringEnum, useQueryState } from 'nuqs';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

enum CalendarView {
    DAY = 'dag',
    THREE_DAYS = 'tre-dager',
    WEEK = 'uke',
}

interface CalendarContextProps {
    currentDate: Date;
    view: CalendarView;
    setView: (view: CalendarView) => Promise<URLSearchParams>;
    setCurrentDate: (date: Date) => Promise<URLSearchParams>;
    start: Date;
    end: Date;
    handleNext: () => void;
    handlePrevious: () => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
    undefined,
);

export const CalendarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const isSmallDevice = !useMediaQuery('(min-width: 1024px)');

    const [currentDate, setCurrentDate] = useQueryState(
        'dato',
        parseAsIsoDate.withDefault(new Date()),
    );
    const [view, setView] = useQueryState(
        'visning',
        parseAsStringEnum(Object.values(CalendarView)).withDefault(
            isSmallDevice ? CalendarView.THREE_DAYS : CalendarView.WEEK,
        ),
    );
    const dateRange = useMemo(() => {
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

    const handleNext = useCallback(() => {
        switch (view) {
            case CalendarView.DAY:
                void setCurrentDate(addDays(currentDate, 1));
                break;
            case CalendarView.THREE_DAYS:
                void setCurrentDate(addDays(currentDate, 3));
                break;
            case CalendarView.WEEK:
                void setCurrentDate(addWeeks(currentDate, 1));
                break;
        }
    }, [currentDate, view, setCurrentDate]);

    const handlePrevious = useCallback(() => {
        switch (view) {
            case CalendarView.DAY:
                void setCurrentDate(addDays(currentDate, -1));
                break;
            case CalendarView.THREE_DAYS:
                void setCurrentDate(addDays(currentDate, -3));
                break;
            case CalendarView.WEEK:
                void setCurrentDate(addWeeks(currentDate, -1));
                break;
        }
    }, [currentDate, view, setCurrentDate]);

    return (
        <CalendarContext.Provider
            value={{
                currentDate,
                view,
                setView,
                setCurrentDate,
                start: dateRange.start,
                end: dateRange.end,
                handleNext,
                handlePrevious,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
};
