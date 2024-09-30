import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Simple tailwind utility function for merging class string stylings
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
