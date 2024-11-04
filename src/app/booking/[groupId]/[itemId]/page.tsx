import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        groupId: string;
        itemId: string;
    };
};

export default async function Page({ params }: Props) {
    const data = await api.item.getItemFromGroup({
        groupId: params.groupId,
        itemId: parseInt(params.itemId),
    });

    if (data == null) return notFound();

    return (
        <div>
            <h1 className="text-2xl">{data.name}</h1>
            <code className="text-orange-200">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </code>
        </div>
    );
}
