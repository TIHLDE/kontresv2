import { Filter, FilterGroup } from './filters';
import StatusIndicator from './status-indicator';
import { BookableItem, Group } from '@prisma/client';

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
                    value: 'upcoming',
                },
                {
                    icon: <StatusIndicator variant={'pending'} />,
                    name: 'Pågående',
                    value: 'ongoing',
                },
                {
                    icon: <StatusIndicator variant={'rejected'} />,
                    name: 'Utløpt',
                    value: 'expired',
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
                    value: 'approved',
                },
                {
                    icon: <StatusIndicator variant={'pending'} />,
                    name: 'Avventer',
                    value: 'awaiting',
                },
                {
                    icon: <StatusIndicator variant={'rejected'} />,
                    name: 'Avslått',
                    value: 'rejected',
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
