'use client';

import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
    const path = usePathname();
    const parts = path.split('/');
    console.log('parts', parts);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink>Booking</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink>KOK</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink>Kontoret</BreadcrumbLink>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
