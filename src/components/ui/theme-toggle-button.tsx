'use client';

import { Button, ButtonProps } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import React from 'react';

export const ThemeToggleButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(function ThemeToggleButton({ ...props }, ref) {
    return (
        <Button
            variant={'outline'}
            size={'icon'}
            className="p-1"
            {...props}
            ref={ref}
        >
            <SunIcon className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
});
ThemeToggleButton.displayName = 'ThemeToggleButton';
