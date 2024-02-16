'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

export default function ThemeToggleButton() {
    return (
        <div className="p-1 cursor-pointer rounded-md border border-border">
            <SunIcon className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </div>
    );
}
