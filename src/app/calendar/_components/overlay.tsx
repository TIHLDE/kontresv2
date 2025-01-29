import { Event } from './calendar';
import { useDrag } from './drag-context';
import { cn } from '@/lib/utils';
import { isSameDay, isWithinInterval } from 'date-fns';

const dateToPixels = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 80 + minutes * (80 / 60);
};

function DragBlock({ style }: { style: React.CSSProperties }) {
    return (
        <div
            className="absolute w-full z-5 pointer-events-none bg-red-500/10"
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
    style,
    color,
}: {
    style: React.CSSProperties;
    color?: string;
}) {
    return (
        <div
            className={cn(
                'absolute w-full z-5 pointer-events-none bg-blue-500/10',
                color,
            )}
            style={style}
        />
    );
}

export function EventsOverlay({ day, events }: { day: Date; events: Event[] }) {
    return events.map((event) => {
        console.log(event);

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
                    style={{
                        top: dateToPixels(event.start),
                        height:
                            dateToPixels(event.end) - dateToPixels(event.start),
                    }}
                    color={event.color}
                    key={event.id}
                />
            );
        }

        if (isStart) {
            return (
                <EventBlock
                    style={{
                        top: dateToPixels(event.start),
                        bottom: 0,
                    }}
                    color={event.color}
                    key={event.id}
                />
            );
        }

        if (isEnd) {
            return (
                <EventBlock
                    style={{
                        top: 0,
                        height: dateToPixels(event.end),
                    }}
                    color={event.color}
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
                    color={event.color}
                    key={event.id}
                />
            );
        }
    });
}
