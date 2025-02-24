'use client';

import { type Event } from './calendar';
import { useDrag } from './drag-context';
import { cn } from '@/lib/utils';
import { format, isSameDay, isWithinInterval } from 'date-fns';
import { nb } from 'date-fns/locale';
import Link from 'next/link';
import { type HTMLAttributes } from 'react';

const dateToPixels = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 80 + minutes * (80 / 60);
};

interface DragBlockProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    style: React.CSSProperties;
}

function DragBlock({ className, style, ...rest }: DragBlockProps) {
    return (
        <div
            {...rest}
            className={cn(
                'absolute w-full z-10 pointer-events-none bg-red-500/20',
                className,
            )}
            style={style}
        />
    );
}

export function DragOverlay({ day }: { day: Date }) {
    const { dragState } = useDrag();

    if (!dragState) return null;

    const isStart = isSameDay(day, dragState.start);
    const isEnd = isSameDay(day, dragState.end);
    const isWithin =
        !isStart &&
        !isEnd &&
        isWithinInterval(day, {
            start: dragState?.start,
            end: dragState?.end,
        });

    if (isStart && isEnd) {
        return (
            <DragBlock
                className="rounded-lg"
                style={{
                    top: dateToPixels(dragState.start),
                    height:
                        dateToPixels(dragState.end) -
                        dateToPixels(dragState.start),
                }}
            />
        );
    }

    if (isStart) {
        return (
            <DragBlock
                className="rounded-t-lg"
                style={{
                    top: dateToPixels(dragState.start),
                    bottom: 0,
                }}
            />
        );
    }

    if (isEnd) {
        return (
            <DragBlock
                className="rounded-b-lg"
                style={{
                    top: 0,
                    height: dateToPixels(dragState.end),
                }}
            />
        );
    }

    if (isWithin) {
        return (
            <DragBlock
                style={{
                    top: 0,
                    bottom: 0,
                }}
            />
        );
    }
}

function EventBlock({
    className,
    style,
    event,
}: {
    className?: string;
    style: React.CSSProperties;
    event: Event;
}) {
    return (
        <Link
            href={`/reservation/${event.id}`}
            className={cn(
                'absolute w-full z-5 bg-background hover:bg-muted cursor-pointer duration-150 p-2 flex flex-col overflow-hidden',
                className,
                event.color,
            )}
            style={style}
        >
            <h3 className="m-0">{event.title}</h3>
            <p className="capitalize">
                {format(event.start, 'EEE, dd.MMM HH:mm', { locale: nb })}
            </p>
            <p className="capitalize">
                {format(event.end, 'EEE, dd.MMM HH:mm', { locale: nb })}
            </p>
        </Link>
    );
}

export function EventsOverlay({ day, events }: { day: Date; events: Event[] }) {
    return events.map((event) => {
        const isStart = isSameDay(day, event.start);
        const isEnd = isSameDay(day, event.end);
        const isWithin =
            !isStart &&
            !isEnd &&
            isWithinInterval(day, {
                start: event.start,
                end: event.end,
            });

        if (isStart && isEnd) {
            return (
                <EventBlock
                    className="rounded-lg"
                    style={{
                        top: dateToPixels(event.start),
                        height:
                            dateToPixels(event.end) - dateToPixels(event.start),
                    }}
                    event={event}
                    key={event.id}
                />
            );
        }

        if (isStart) {
            return (
                <EventBlock
                    className="rounded-t-lg"
                    style={{
                        top: dateToPixels(event.start),
                        bottom: 0,
                    }}
                    event={event}
                    key={event.id}
                />
            );
        }

        if (isEnd) {
            return (
                <EventBlock
                    className="rounded-b-lg"
                    style={{
                        top: 0,
                        height: dateToPixels(event.end),
                    }}
                    event={event}
                    key={event.id}
                />
            );
        }

        if (isWithin) {
            return (
                <EventBlock
                    style={{
                        top: 0,
                        bottom: 0,
                    }}
                    event={event}
                    key={event.id}
                />
            );
        }
    });
}
