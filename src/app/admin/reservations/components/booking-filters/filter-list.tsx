import { FilterGroup } from '@/components/ui/filters/filters';
import StatusIndicator from '@/components/ui/filters/status-indicator';

import { TimeDirection } from '../../../utils/enums';
import { BookableItem, Group, ReservationState } from '@prisma/client';
import {
    AlertCircleIcon,
    ClockIcon,
    ShapesIcon,
    UsersIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function reservationFilterList({
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
                };
            }),
        },
        {
            header: 'Gruppe',
            value: 'group',
            filters: groups.map((group) => {
                return {
                    name: group.name,
                    value: group.groupId.toString(),
                };
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
