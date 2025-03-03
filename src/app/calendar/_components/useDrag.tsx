import { createContext, useContext, useState } from 'react';

interface DragState {
    startDate: Date;
    endDate: Date;
    isDragging: boolean;
}

interface DragContextType {
    dragState: DragState | null;
    handleDragStart: (date: Date) => void;
    handleDragMove: (date: Date) => void;
    handleDragEnd: () => void;
}

const DragContext = createContext<DragContextType | null>(null);

export function DragProvider({ children }: { children: React.ReactNode }) {
    const [dragState, setDragState] = useState<DragState | null>(null);

    const handleDragStart = (date: Date) => {
        setDragState({
            startDate: date,
            endDate: date,
            isDragging: true,
        });
    };

    const handleDragMove = (date: Date) => {
        if (!dragState?.isDragging) return;

        setDragState((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                endDate: date,
            };
        });
    };

    const handleDragEnd = () => {
        if (!dragState?.isDragging) return;

        setDragState((prev) => {
            if (!prev) return null;

            const [startDate, endDate] = [prev.startDate, prev.endDate].sort(
                (a, b) => a.getTime() - b.getTime(),
            ) as [Date, Date];

            return {
                startDate,
                endDate,
                isDragging: false,
            };
        });
    };

    return (
        <DragContext.Provider
            value={{
                dragState,
                handleDragStart,
                handleDragMove,
                handleDragEnd,
            }}
        >
            {children}
        </DragContext.Provider>
    );
}

export function useDrag() {
    const context = useContext(DragContext);
    if (!context) throw new Error('useDrag must be used within DragProvider');
    return context;
}
