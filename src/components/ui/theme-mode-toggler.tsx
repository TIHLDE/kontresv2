'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './drawer';
import { useTheme } from 'next-themes';
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ModeToggleProps extends ButtonProps {
    mobile?: boolean;
}

export function MobileModeToggle({ ...props }: ButtonProps) {
    const { setTheme } = useTheme();

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <ThemeToggleButton {...props} />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Velg fargetema</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-3 px-4" >
                        <Button variant="outline" onClick={() => setTheme("light")}>Light</Button>
                        <Button variant="outline" onClick={() => setTheme("dark")}>Dark</Button>
                        <Button variant="outline" onClick={() => setTheme("system")}>System</Button>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button className="w-full">Lukk</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export function ModeToggle({ mobile, ...props }: ModeToggleProps) {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ThemeToggleButton {...props} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const ThemeToggleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {

    return (
        <Button variant="outline" size="icon" {...props} className="className" ref={ref}>
            <SunIcon className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
});

ThemeToggleButton.displayName = "ThemeToggleButton";
