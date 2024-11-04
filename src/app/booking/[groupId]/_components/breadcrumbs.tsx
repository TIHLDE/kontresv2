'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function Breadcrumbs() {
    const path = usePathname();
    const parts = path.substring(1).split('/');
    let accumulatedPath = '';

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {parts.map((part, i) => {
                    accumulatedPath += `/${part}`;

                    if (i === parts.length - 1) {
                        return (
                            <BreadcrumbItem key={i}>
                                <BreadcrumbPage>{part}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={accumulatedPath}>
                                    {part}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
