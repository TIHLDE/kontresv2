import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table } from '@/components/ui/table';

import { cn } from '@/utils/cn';

import ApprovedPage from './components/approved-page';
import BookingList from './components/booking-list/booking-list';
import { DataTable } from './components/old-components/data-table';
import ItemsListSkeleton from './components/old-components/items-list-skeleton';
import { type ParamsProps } from '@/lib/utils';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageButtonProps {
    route: string;
    label: string;
    active?: boolean;
}

const PageButton = ({ route, label, active }: PageButtonProps) => {
    return (
        <Link
            href={{
                query: {
                    page: route,
                },
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

const AdminButtons: { label: string; route: string; separated?: boolean }[] = [
    { label: 'Avventende søknader', route: 'awaiting' },
    { label: 'Godkjente søknader', route: 'approved' },
    { label: 'Avslåtte søknader', route: 'rejected' },
    { label: 'Gjenstander', route: 'items', separated: true },
];

const Admin = async ({ searchParams }: ParamsProps<{ page: string }>) => {
    // Get the user

    // Set default values for searchParams if none is defined
    if (!searchParams) {
        searchParams = { page: 'awaiting' };
    } else {
        searchParams.page = searchParams.page ?? 'awaiting';
    }

    return (
        <div className="max-w-page h-[80vh] mx-auto md:w-full grid md:grid-cols-[min-content_auto] grid-cols-1 gap-10">
            <Card className="md:min-w-72">
                <CardContent className="pt-5 w-full">
                    <div className="w-full items-start flex flex-col">
                        {AdminButtons.map((button) => (
                            <>
                                {button.separated && (
                                    <Separator
                                        orientation="horizontal"
                                        className="my-1"
                                    />
                                )}
                                <PageButton
                                    key={button.label}
                                    route={button.route}
                                    label={button.label}
                                    active={searchParams?.page === button.route}
                                />
                            </>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <div className="flex flex-col w-full gap-5">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {
                        AdminButtons.find((i) => i.route == searchParams.page)
                            ?.label
                    }
                </h1>
                <Card className="md:min-w-72 h-full">
                    <CardContent className="pt-5 w-full h-full">
                        <Suspense fallback={<ItemsListSkeleton />}>
                            <ApprovedPage />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
