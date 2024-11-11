import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { api } from '@/trpc/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        groupId: string;
    };
};

export default async function GroupPage({ params }: Props) {
    const groupItems = await api.item.getItemsFromGroup(params.groupId);

    if (groupItems.length === 0) return notFound();
    const group = groupItems[0]!.group;

    return (
        <div>
            <h1 className="text-2xl">{group.name}</h1>

            <div className="flex flex-col">
                {groupItems.map((item) => (
                    <Card className="max-w-[400px]" key={item.itemSlug}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>{item.description}</CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link
                                    href={`/booking/${group.groupSlug}/${item.itemSlug}`}
                                >
                                    Gå til gjenstand
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
