import { weekDays } from '@/lib/utils';
import { add, format, getWeek, getYear, startOfWeek } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function CalendarWeekView({
    currentDay,
    setCurrentDay,
    resetChoice,
}: {
    currentDay: Date;
    setCurrentDay: (date: Date) => void;
    resetChoice: () => void;
}) {
    return (
        <>
            <div className="flex w-full justify-center gap-4 py-2">
                <button
                    onClick={() => {
                        setCurrentDay(add(currentDay, { weeks: -1 }));
                        resetChoice();
                    }}
                >
                    <ChevronLeftIcon />
                </button>
                <h3 className="text-2xl font-medium">
                    {'Uke ' + getWeek(currentDay) + ', ' + getYear(currentDay)}
                </h3>
                <button
                    onClick={() => {
                        setCurrentDay(add(currentDay, { weeks: 1 }));
                        resetChoice();
                    }}
                >
                    <ChevronRightIcon />
                </button>
            </div>

            <div className="grid grid-cols-7">
                {weekDays.map((day, index) => {
                    return (
                        <h4
                            key={index}
                            className="text-sm font-medium block pt-2 mx-auto"
                        >
                            {day +
                                ' ' +
                                format(
                                    add(
                                        startOfWeek(currentDay, {
                                            weekStartsOn: 1,
                                        }),
                                        {
                                            days: index,
                                        },
                                    ),
                                    'dd. MMMM',
                                    { locale: nb },
                                )}
                        </h4>
                    );
                })}
            </div>
        </>
    );
}
