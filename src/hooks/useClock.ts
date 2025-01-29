import { useEffect } from 'react';

export const useClock = (fn: () => void) => {
    useEffect(() => {
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        const timeout = setTimeout(() => {
            fn();
            const interval = setInterval(fn, 60 * 1000);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [fn]);
};
