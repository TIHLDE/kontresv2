import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loadingspinner';
import { Separator } from '@/components/ui/separator';

import AdminFilters from './components/admin-filters/admin-filters';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { Suspense } from 'react';

const AdminButtons: { label: string; route: string; separated?: boolean }[] = [
    { label: 'Avventende søknader', route: 'awaiting' },
    { label: 'Godkjente søknader', route: 'approved' },
    { label: 'Avslåtte søknader', route: 'rejected' },
    { label: 'Gjenstander', route: 'items', separated: true },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-page h-[80vh] mx-auto md:w-full grid md:grid-cols-[min-content_auto] grid-cols-1 gap-10">
            <AdminFilters className="min-w-72" />
            <div className="flex flex-col w-full gap-5">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Tittel
                </h1>
                <Card className="md:min-w-72 h-full">
                    <CardContent className="pt-5 w-full h-full">
                        <Suspense fallback={<LoadingSpinner />}>
                            {children}
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

interface PageButtonProps {
    route: string;
    label: string;
    active?: boolean;
}

const PageButton = ({ route, label, active }: PageButtonProps) => {
    return (
        <Link
            href={{
                pathname: `/admin/${route}`,
            }}
            prefetch={true}
            className={cn(
                'w-full rounded-md py-2.5 px-5 font-medium text-start',
                active ? 'bg-primary/10' : 'bg-none hover:bg-accent/50',
            )}
        >
            {label}
        </Link>
    );
};
