'use client';

import { addDays, format, isToday } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: string;
}

const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, '0')}:00`,
);

const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

export default function Calendar({ events }: { events: Event[] }) {
    return (
        <div className="flex">
            <CalendarHours />
            {days.map((day, i) => (
                <CalendarDay key={i} day={day} />
            ))}
        </div>
    );
}

function CalendarHours() {
    return (
        <div className="flex flex-col pt-12 px-1 border-r">
            {hours.map((hour, i) => (
                <div key={i} className="h-20 w-12 relative">
                    <span className="absolute -translate-y-1/2">{hour}</span>
                </div>
            ))}
        </div>
    );
}

function CalendarDay({ day }: { day: Date }) {
    const dayString = format(day, 'EEE dd', { locale: nb }).toUpperCase();
    const today = isToday(day);

    return (
        <div className="w-full border-r">
            <div className="h-12 border-b p-2 text-center font-semibold">
                {dayString}
            </div>
            <div className="relative">
                {hours.map((_, i) => (
                    <CalendarHour key={i} />
                ))}
                {today && <CurrentTimeIndicator />}
            </div>
        </div>
    );
}

function CalendarHour() {
    return <div className="h-20 w-full border-b"></div>;
}

function CurrentTimeIndicator() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const updateNow = () => setNow(new Date());

        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        const timeout = setTimeout(() => {
            updateNow();
            const interval = setInterval(updateNow, 60 * 1000);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    const minutesSinceStartOfDay = now.getHours() * 60 + now.getMinutes();
    const topPosition = (minutesSinceStartOfDay / 60) * 80;

    const style = {
        top: `${topPosition}px`,
    };

    return (
        <div
            className="absolute w-full border-t-2 border-red-500"
            style={style}
        ></div>
    );
}
