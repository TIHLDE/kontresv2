import { Button } from '../button';
import { DateTimePicker } from '../date-time-picker';
import { format, toDate } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function PossibleBooking({
    dragStart,
    dragEnd,
    setRelativeMousePosition,
    view,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    typeUUID,
    containerRef,
}: {
    dragStart: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    dragEnd: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    setRelativeMousePosition: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | null,
    ) => void;
    view: 'week' | 'day';
    startDate: Date | null;
    setStartDate: (e: Date) => void;
    endDate: Date | null;
    setEndDate: (e: Date) => void;
    typeUUID: string;
    containerRef: React.RefObject<HTMLDivElement>;
}) {
    const router = useRouter();
    function buildUrl() {
        return (
            '/booking?from=' +
            format(startDate!, 'PPP HH:mm:ss') +
            '&to=' +
            format(endDate!, 'PPP HH:mm:ss') +
            '&itemUUID=' +
            typeUUID
        );
    }
    return (
        dragStart &&
        dragEnd && (
            <div
                className="rounded-md absolute dark:bg-zinc-700 bg-zinc-400  shadow-sm border z-10"
                style={{
                    top:
                        dragStart.pageY -
                        containerRef.current!.getBoundingClientRect().top -
                        window.scrollY,
                    //trash formel men orker virkelig ikke rn
                    left:
                        view == 'week'
                            ? (Math.floor(
                                  ((dragStart.pageX -
                                      containerRef.current!.offsetLeft) /
                                      containerRef.current!.offsetWidth) *
                                      7,
                              ) *
                                  100) /
                                  7 +
                              '%'
                            : '0',
                    height: dragEnd!.pageY - dragStart!.pageY,
                    width: view == 'week' ? 100 / 7 + '%' : '100%',
                }}
            >
                <div className="relative h-full w-full">
                    <div
                        className="absolute top-full left-0 p-4 border rounded-md w-64 bg-background shadow-sm"
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        onMouseMove={(e) => {
                            e.stopPropagation();
                            setRelativeMousePosition(null);
                        }}
                    >
                        <div className="text-sm text-neutral-500">Start:</div>
                        <DateTimePicker
                            initialDate={startDate || new Date()}
                            className="mb-4 w-full"
                            onChange={(e) => {
                                setStartDate(
                                    toDate(e.target.value) || new Date(),
                                );
                            }}
                        />
                        <div className="text-sm text-neutral-500">Slutt:</div>
                        <DateTimePicker
                            className="mb-4 w-full"
                            initialDate={endDate || new Date()}
                            onChange={(e) =>
                                setEndDate(toDate(e.target.value) || new Date())
                            }
                        />
                        <Button
                            className="w-full"
                            onClick={() => router.push(buildUrl(), {})}
                        >
                            Reserver
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}
