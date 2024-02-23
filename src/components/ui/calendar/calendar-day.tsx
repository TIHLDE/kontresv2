'use client';

import { cn } from '../../../lib/utils';

const hours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

export default function CalendarDay({
    index,
    className,
}: {
    index: number;
    className?: String;
}) {
    return (
        <div
            className={cn(
                'flex flex-col h-full',
                index !== 6 ? 'border-r' : '',
                className,
            )}
        >
            <div className="h-full">
                {[...Array(24)].map((_, hour) => (
                    <div
                        key={hour}
                        className={cn(
                            'border-border pl-1 pt-1 text-muted-foreground text-sm h-12',
                            hour !== 23 ? 'border-b' : '',
                        )}
                    >
                        {index == 0 ? hours[hour] : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
