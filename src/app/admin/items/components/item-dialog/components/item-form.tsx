'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import GroupSelect from '@/components/ui/group-select';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ItemForm() {
    const schema = z.object({
        name: z.string().min(1, {
            message: 'Navnet på gjenstanden er påkrevd',
        }),
        description: z.string().min(5, {
            message: 'Gjenstandsbeskrivelsen må være minst 5 tegn langt',
        }),
        group: z.string().min(1, {
            message: 'Gjenstanden må tilhøre en gruppe',
        }),
    });
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        console.log(values);
    };

    const { data: session } = useSession();
    const groups = useMemo(() => session?.user.groups, [session]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Navn</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Beskrivelse</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field: { onChange, value } }) => (
                        <FormItem className="w-full">
                            <FormLabel>Gruppe</FormLabel>
                            <FormControl>
                                <GroupSelect
                                    className="w-full"
                                    groups={groups}
                                    onChange={onChange}
                                    value={value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
