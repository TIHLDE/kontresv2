import { Button, ButtonProps } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import AdminSidebar from './components/sidebar/admin-sidebar';
import AdminBookingFilters from './reservations/components/booking-filters/booking-filters';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { ReactNode, Suspense } from 'react';

const AdminButtons: { label: string; route: string; separated?: boolean }[] = [
    { label: 'Avventende søknader', route: 'awaiting' },
    { label: 'Godkjente søknader', route: 'approved' },
    { label: 'Avslåtte søknader', route: 'rejected' },
    { label: 'Gjenstander', route: 'items', separated: true },
];

interface SideBarNavigationButtonProps extends ButtonProps {
    route: string;
    highlighted?: boolean;
    icon?: ReactNode;
    link?: {
        className?: string;
    };
}
export function SideBarNavigationButton({
    highlighted,
    route,
    icon,
    className,
    link,
    children,
    ...props
}: SideBarNavigationButtonProps) {
    return (
        <Link href={route} className={cn('w-full', link?.className)}>
            <Button
                variant={highlighted ? 'default' : 'ghost'}
                {...props}
                className={cn('w-full gap-2.5 items-center', className)}
            >
                {icon}
                {children}
            </Button>
        </Link>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-page h-[80vh] mx-auto md:w-full grid md:grid-cols-[min-content_auto] grid-cols-1 gap-10">
            <AdminSidebar />
            <div className="flex flex-col w-full gap-5">
                <Card className="md:min-w-72 h-full">
                    <Suspense fallback={<LoadingSpinner />}>
                        {children}
                    </Suspense>
                </Card>
            </div>
        </div>
    );
}
