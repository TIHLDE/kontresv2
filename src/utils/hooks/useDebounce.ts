import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);
    useEffect(() => {
        setIsDebouncing(true);
        const handler = setTimeout(() => {
            setIsDebouncing(false);
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return [debouncedValue, isDebouncing] as const;
}
