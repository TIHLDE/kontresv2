'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { api } from '@/trpc/react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export default function Filter({ id }: { id: number }) {
    const { data: bookableItems } = api.bookableItem.getAll.useQuery();

    const [itemId, setItemId] = useQueryState('id', parseAsInteger);

    useEffect(() => {
        if (!itemId && id) {
            void setItemId(id);
        }
    }, [itemId, id, setItemId]);

    return (
        <Card className="h-fit w-full lg:w-96">
            <CardHeader>
                <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    defaultValue={itemId?.toString()}
                    onValueChange={(v) => setItemId(Number(v))}
                >
                    {bookableItems?.map((item) => (
                        <div
                            key={item.itemId}
                            className="flex items-center gap-2"
                        >
                            <RadioGroupItem
                                value={item.itemId.toString()}
                                id={item.itemId.toString()}
                            />
                            <Label htmlFor={item.itemId.toString()}>
                                {item.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
}
