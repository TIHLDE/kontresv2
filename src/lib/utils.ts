import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function leftPad(value: number | string, length: number, padChar = '0') {
    return String(value).padStart(length, padChar);
}

export const weekDays = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
];

export interface RelativeMousePositionProps {
    x: number;
    y: number;
    day: number;
    hours: number;
    minutes: number;
}
export function getDateAtMousePosition<RelativeMousePositionProps>(
    e: React.MouseEvent<HTMLDivElement>,
) {
    console.log(e.nativeEvent);
    const yPos = e.nativeEvent.clientY;
    const xPos = e.nativeEvent.clientX;
    const height = e.currentTarget.clientHeight;
    const width = e.currentTarget.clientWidth;
    const day = Math.floor(
        ((xPos - e.currentTarget.getBoundingClientRect().left) / width) * 7,
    );
    console.log(e.nativeEvent.offsetY);
    return {
        x: xPos,
        y: yPos,
        day,
        hours: Math.floor(
            ((e.nativeEvent.target as HTMLDivElement).offsetTop / height) * 24,
        ),
        minutes: Math.floor( e.nativeEvent.offsetY/48*60),
    };
}

export function compareMousePositions(
    a: RelativeMousePositionProps | null,
    b: RelativeMousePositionProps | null,
) {
    if (!a || !b) return false;
    return (
        a.x === b.x &&
        a.y === b.y &&
        a.day === b.day &&
        a.hours === b.hours &&
        a.minutes === b.minutes
    );
}
