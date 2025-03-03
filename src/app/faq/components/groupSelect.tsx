'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useSession } from 'next-auth/react';

export default function GroupSelect({
    field,
}: {
    field: { onChange: any; value: string | undefined };
}) {
    const { data: session } = useSession();

    const groups = session?.user.groups;

    return (
        <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Velg en gruppe" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {groups?.map((item, index) => (
                        <SelectItem value={item} key={index}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
