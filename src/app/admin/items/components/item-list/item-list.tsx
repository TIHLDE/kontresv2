'use client';

import { itemColumns } from './item-columns';
import { DataTable } from '@/app/admin/components/old-components/data-table';
import { BookableItem } from '@prisma/client';

interface ItemListProps {
    items: BookableItem[];
}
export default function ItemList({ items }: ItemListProps) {
    return (
        <DataTable
            columns={itemColumns}
            data={items}
            displayPageNavigation={false}
        />
    );
}
