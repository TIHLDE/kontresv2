import { api } from '@/trpc/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        groupId: string;
    };
};

export default async function GroupPage({ params }: Props) {
    const itemsForGroup = (await api.item.getItems()).filter(
        (v) => v.groupId === params.groupId,
    );

    if (itemsForGroup.length === 0) return notFound();
    return (
        <div>
            <h1>Group {params.groupId}</h1>
            <ul>
                {itemsForGroup.map((item) => (
                    <li key={item.itemId}>
                        <Link
                            href={`/booking/${params.groupId}/${item.itemId}`}
                        >
                            {item.name}
                        </Link>{' '}
                    </li>
                ))}
            </ul>
        </div>
    );
}
