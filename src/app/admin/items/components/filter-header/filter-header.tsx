'use client';

import { Button } from '@/components/ui/button';

import ItemDialog from '../item-dialog/item-dialog';
import AdminItemFilters from '../item-filters/item-filters';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface FilterHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export default function FilterHeader({
    className,
    ...props
}: FilterHeaderProps) {
    return (
        <div
            className={cn(
                'w-full flex justify-between items-center',
                className,
            )}
            {...props}
        >
            <AdminItemFilters />
            <ItemDialog />
        </div>
    );
}
