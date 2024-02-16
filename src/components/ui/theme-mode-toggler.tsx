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
import ThemeToggleButton from './theme-toggle-button';
import { useTheme } from 'next-themes';

interface ModeToggleProps extends ButtonProps {
    mobile?: boolean;
}

export function MobileModeToggle({ className, ...props }: ButtonProps) {
    const { setTheme } = useTheme();

    return (
        <>
            <Drawer>
                <DrawerTrigger>{/* <ThemeToggleButton /> */}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Velg fargetema</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-3 px-4">
                        <Button
                            variant="outline"
                            onClick={() => setTheme('light')}
                        >
                            Light
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setTheme('dark')}
                        >
                            Dark
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setTheme('system')}
                        >
                            System
                        </Button>
                    </div>

                    <DrawerFooter>
                        <DrawerClose>
                            <Button className="w-full">Lukk</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export function ModeToggle({ className, mobile, ...props }: ModeToggleProps) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ThemeToggleButton />
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
