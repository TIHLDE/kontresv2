'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import BookableItemsSelect from './bookableItemsSelect';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookableItem } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    question: z.string(),
    answer: z.string(),
    bookableItemIds: z.array(z.number()),
});

export type FaqFormValueTypes = z.infer<typeof formSchema>;

export default function createFaqForm() {
    const { mutateAsync: createFaq } = api.faq.create.useMutation();

    const form = useForm<FaqFormValueTypes>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: '',
            answer: '',
            bookableItemIds: [],
        },
    });

    async function onSubmit(formData: FaqFormValueTypes) {
        console.log('Bookable Item ids', formData.bookableItemIds);
        try {
            await createFaq({
                question: formData.question,
                answer: formData.answer,
                group: 'KOK',
                author: 'Daniel',
                bookableItemIds: formData.bookableItemIds.map((i) =>
                    parseInt(i),
                ),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tittel</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={
                                        'Hvilket spørsmål skal besvares?'
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Hvilket spørsmål skal besvares?
                            </FormDescription>
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Svar</FormLabel>
                            <FormControl>
                                <Input
                                    type="textfield"
                                    placeholder={
                                        'Skriv et utfyllende svar på spørsmålet.'
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Skriv et utfyllende svar på spørsmålet
                            </FormDescription>
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="bookableItemIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Gjelder spørsmålet en spesifik gjenstand?
                            </FormLabel>
                            <FormControl>
                                <BookableItemsSelect
                                    field={field}
                                    form={form}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                ></FormField>

                <Button type="submit">Opprett</Button>
            </form>
        </Form>
    );
}
