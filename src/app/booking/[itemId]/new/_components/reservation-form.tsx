'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import ReservationCalendar from './reservation-calendar';
import ReservationCombobox from './reservation-combobox';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes } from 'date-fns';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    itemId: z.string(),
    description: z.string(),
    servesAlchohol: z.boolean().optional(),
    soberWatchId: z.string().optional(),
    acceptedRules: z.boolean({
        required_error: 'Du må godta vilkårene for å kunne reservere',
    }),
    senderId: z.string(),
});

export default function ReservationForm() {
    const searchParams = useSearchParams();
    const startDate = new Date(searchParams.get('start') ?? Date.now());
    const endDate = new Date(searchParams.get('end') ?? Date.now());
    const itemId = searchParams.get('id') ?? undefined;

    const session = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate,
            endDate,
            itemId,
            description: undefined,
            servesAlchohol: false,
            soberWatchId: undefined,
            acceptedRules: false,
            senderId: 'self',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    const startDateValue = form.watch('startDate');
    const itemIdValue = form.watch('itemId');
    const servesAlchoholValue = form.watch('servesAlchohol');

    const { data: bookableItems } = api.bookableItem.getAll.useQuery();

    const selectedBookableItem = itemIdValue
        ? bookableItems?.find((item) => item.itemId === Number(itemIdValue))
        : undefined;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="my-0">
                                <FormControl>
                                    <ReservationCalendar
                                        value={field.value}
                                        onChange={field.onChange}
                                        minDateTime={new Date()}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="my-0">
                                <FormControl>
                                    <ReservationCalendar
                                        value={field.value}
                                        onChange={field.onChange}
                                        minDateTime={addMinutes(
                                            startDateValue,
                                            30,
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="itemId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gjenstand</FormLabel>
                            <FormControl>
                                <Select
                                    defaultValue={field.value}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Velg en gjenstand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bookableItems?.map((item) => (
                                            <SelectItem
                                                key={item.itemId}
                                                value={String(item.itemId)}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {selectedBookableItem?.allowsAlcohol && (
                    <FormField
                        control={form.control}
                        name="servesAlchohol"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Vi skal servere alkohol på arrangementet
                                        og har fylt ut{' '}
                                        <Link
                                            href="https://hjelp.ntnu.no/tas/public/ssp/content/serviceflow?unid=8f090c9e58444762876750db1104178d&from=aef98c8c-3eb9-4e29-8439-e79834d88223&openedFromService=true"
                                            target="_blank"
                                            className="font-bold underline"
                                        >
                                            søknad hos NTNU
                                        </Link>
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                )}
                {servesAlchoholValue && (
                    <FormField
                        control={form.control}
                        name="soberWatchId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Edruvakt sitt navn</FormLabel>
                                <FormControl>
                                    <ReservationCombobox field={field} />
                                    {/* <Input {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="acceptedRules"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="!my-0">
                                    Jeg godtar{' '}
                                    <Link
                                        href="https://tihlde.org/wiki/tihlde/lover-og-regler/"
                                        className="font-bold underline"
                                        target="_blank"
                                    >
                                        vilkårene for bruk og utlån av TIHLDEs
                                        eiendeler
                                    </Link>
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="senderId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select
                                    defaultValue={field.value}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Avsender sin id" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <>
                                            <SelectItem value="self">
                                                Meg selv
                                            </SelectItem>
                                            {session.data?.user.groups.map(
                                                (group) => (
                                                    <SelectItem
                                                        key={group}
                                                        value={group}
                                                    >
                                                        {group}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Reserver
                </Button>
            </form>
        </Form>
    );
}
