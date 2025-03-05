import { TimeDirection } from '../../utils/enums';
import { Filter, FilterGroup } from './filters';
import StatusIndicator from './status-indicator';
import { BookableItem, Group, ReservationState } from '@prisma/client';
import {
    AlertCircleIcon,
    ClockIcon,
    LucideIcon,
    ShapesIcon,
    UsersIcon,
} from 'lucide-react';
import { FC, ReactNode } from 'react';

export default function filterList({
    groups,
    items,
}: {
    groups: Group[];
    items: BookableItem[];
}): FilterGroup[] {
    return [
        {
            header: 'Tidsrom',
            value: 'time',
            filters: [
                {
                    icon: <StatusIndicator variant={'approved'} />,
                    name: 'Kommende',
                    value: TimeDirection.FORWARD,
                },
                {
                    icon: <StatusIndicator variant={'pending'} />,
                    name: 'Pågående',
                    value: TimeDirection.PRESENT,
                },
                {
                    icon: <StatusIndicator variant={'rejected'} />,
                    name: 'Utløpt',
                    value: TimeDirection.BACKWARD,
                },
            ],
        },
        {
            header: 'Status',
            value: 'status',
            filters: [
                {
                    icon: <StatusIndicator variant={'approved'} />,
                    name: 'Godkjent',
                    value: ReservationState.APPROVED,
                },
                {
                    icon: <StatusIndicator variant={'pending'} />,
                    name: 'Avventer',
                    value: ReservationState.PENDING,
                },
                {
                    icon: <StatusIndicator variant={'rejected'} />,
                    name: 'Avslått',
                    value: ReservationState.REJECTED,
                },
            ],
        },
        {
            header: 'Gjenstand',
            value: 'item',
            filters: items.map((item) => {
                return {
                    name: item.name,
                    value: item.itemId.toString(),
                } as Filter;
            }),
        },
        {
            header: 'Gruppe',
            value: 'group',
            filters: groups.map((group) => {
                return {
                    name: group.name,
                    value: group.groupId.toString(),
                } as Filter;
            }),
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
