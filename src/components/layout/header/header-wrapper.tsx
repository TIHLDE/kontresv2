'use client';

import { cn } from '../../../lib/utils';
import { useEffect, useState } from 'react';

interface HeaderWrapperProps extends React.HTMLProps<HTMLHeadElement> {}

export default function HeaderWrapper({
    children,
    className,
    ...props
}: HeaderWrapperProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <header
            className={cn(
                'p-4 py-1 min-h-[80px] backdrop-blur-sm top-0 transition-all duration-300 fixed w-full bg-background/80 border-border justify-start items-center flex z-50',
                isScrolled ? 'border-b' : '',
                className,
            )}
            {...props}
        >
            {children}
        </header>
    );
}
