import { FilterGroup } from '../../../../../components/ui/filters/filters';
import { BookableItem, Group } from '@prisma/client';
import {
    AlertCircleIcon,
    ClockIcon,
    ShapesIcon,
    UsersIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function itemFilterList({
    groups,
    items,
}: {
    groups: Group[];
    items: BookableItem[];
}): FilterGroup[] {
    return [
        {
            header: 'Gruppe',
            value: 'group',
            filters: groups.map((group) => ({
                name: group.name,
                value: group.groupId,
            })),
        },
        {
            header: 'Gjenstand',
            value: 'item',
            filters: items.map((item) => ({
                name: item.name,
                value: item.itemId.toString(),
            })),
        },
    ];
}

// Object containing filterLists group values as keys, and an icon as value
export const GroupIcons: Record<string, ReactNode> = {
    group: <UsersIcon size={12} />,
    status: <AlertCircleIcon size={12} />,
    item: <ShapesIcon size={12} />,
    time: <ClockIcon size={12} />,
};
