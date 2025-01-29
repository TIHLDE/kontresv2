import { addMinutes } from 'date-fns';
import { createContext, useCallback, useContext, useState } from 'react';

interface DragState {
    start: Date;
    end: Date;
    creating: boolean;
}

interface DragContextType {
    dragState: DragState | null;
    onDragStart: (date: Date, e: React.MouseEvent) => void;
    onDragMove: (date: Date, e: React.MouseEvent) => void;
    onDragEnd: () => void;
}

const HOUR_CELL_HEIGHT = 80;

const snapToInterval = (relativeY: number) => {
    const snapped =
        (Math.round(relativeY / (HOUR_CELL_HEIGHT / 4)) * HOUR_CELL_HEIGHT) / 4;
    return snapped;
};

const dateToInterval = (day: Date, snappedY: number) => {
    const minutes = (snappedY / 20) * 15;
    return addMinutes(day, minutes);
};

const DragContext = createContext<DragContextType>(null!);

export function DragProvider({ children }: { children: React.ReactNode }) {
    const [dragState, setDragState] = useState<DragState | null>(null);

    const onDragStart = useCallback((day: Date, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const snappedY = snapToInterval(relativeY);
        const snappedDay = dateToInterval(day, snappedY);

        setDragState({
            start: snappedDay,
            end: snappedDay,
            creating: true,
        });
    }, []);

    const onDragMove = useCallback(
        (day: Date, e: React.MouseEvent) => {
            if (!dragState?.creating) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const relativeY = e.clientY - rect.top;
            const snappedY = snapToInterval(relativeY);
            const snappedDay = dateToInterval(day, snappedY);

            if (snappedDay.getTime() < dragState.start.getTime()) {
                setDragState((prev) => {
                    if (!prev?.creating) return null;

                    return {
                        ...prev,
                        start: snappedDay,
                    };
                });
            }

            if (snappedDay.getTime() > dragState.start.getTime()) {
                setDragState((prev) => {
                    if (!prev?.creating) return null;

                    return {
                        ...prev,
                        end: snappedDay,
                    };
                });
            }
        },
        [dragState],
    );

    const onDragEnd = useCallback(() => {
        setDragState((prev) => {
            if (!prev?.creating) return null;

            if (prev.start.getTime() === prev.end.getTime()) return null;

            return {
                ...prev,
                creating: false,
            };
        });
    }, []);

    return (
        <DragContext.Provider
            value={{
                dragState,
                onDragStart,
                onDragMove,
                onDragEnd,
            }}
        >
            {children}
        </DragContext.Provider>
    );
}

export const useDrag = () => useContext(DragContext);
