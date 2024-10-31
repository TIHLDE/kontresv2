'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

import BookableItemsSelect from './bookableItemsSelect';
import { CACHE_TAGS } from '@/lib/cacheTags';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import GroupSelect from './groupSelect';
import { useEffect, useState } from 'react';

const formSchema = z.object({
    question: z.string().min(1, {
        message: 'Du må legge inn et spørsmål',
    }),
    answer: z.string().min(1, {
        message: 'Legg inn et svar på spørsmålet',
    }),
    bookableItemIds: z.array(z.number()).optional(),
    group: z.string().optional()
});

export type FaqFormValueTypes = z.infer<typeof formSchema>;

export default function CreateFaqForm(params?: {questionId?: string}) {
    const { mutateAsync: createFaq } = api.faq.create.useMutation();
    const { mutateAsync: updateFaq } = api.faq.update.useMutation();
    const queryClient = useQueryClient();

    //const [updateQuestion, setUpdateQuestion] = useState(undefined);


    const {data: updateQuestion, isLoading} = 
        api.faq.getById.useQuery({
            questionId: parseInt(params?.questionId)
    });


    const { data: session } = useSession();

    const { toast } = useToast();

    const groups = session?.user.groups

    const form = useForm<FaqFormValueTypes>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: '',
            answer: '',
            bookableItemIds: [],
            group: (groups ? groups[0] : "")
        },
    });

    useEffect(()=> {
        if (updateQuestion && !isLoading){
            form.reset({
                question: updateQuestion?.question || '',
                answer: updateQuestion?.answer || '',
                bookableItemIds: updateQuestion.bookableItems? updateQuestion?.bookableItems.map((item)=>item.itemId) : [],
                group: updateQuestion?.group || (groups ? groups[0] : "")
            })
        }
    }, [updateQuestion, isLoading])

    async function onSubmit(formData: FaqFormValueTypes) {
        try {
            params?.questionId 
            ? await updateFaq({
                questionId: parseInt(params?.questionId),
                question: formData.question,
                answer: formData.answer,
                bookableItemIds: formData.bookableItemIds,
                author: session?.user?.firstName + " " + session?.user?.lastName,
                group: formData.group || session?.user.leaderOf[0],
                groupId: '1',
            })
                .then(async () => {
                    toast({
                        description: '🎉Innlegget er endret🎉',
                        duration: 5000,
                        action: (
                            <ToastAction altText="Til FAQ-siden" className="border-black">
                                <Link href={`/faq`} onClick={() => toast}>
                                    Til FAQ-siden{' '}
                                </Link>
                            </ToastAction>
                        ),
                    });
                    form.reset();
                    await queryClient.invalidateQueries({
                        queryKey: [CACHE_TAGS.FAQS],
                    });
                })
                .catch((err) => {
                    console.error(err);
                    toast({
                        variant: 'destructive',
                        description: 'Noe gikk galt:(',
                    });
                    
            })
            : await createFaq({
                question: formData.question,
                answer: formData.answer,
                bookableItemIds: formData.bookableItemIds,
                author: session?.user?.firstName + " " + session?.user?.lastName,
                group: formData.group || session?.user.leaderOf[0],
                groupId: '1',
            })
                .then(async () => {
                    toast({
                        description: '🎉Innlegget er opprettet🎉',
                        duration: 5000,
                        action: (
                            <ToastAction altText="Til FAQ-siden" className="border-black">
                                <Link href={`/faq`} onClick={() => toast}>
                                    Til FAQ-siden{' '}
                                </Link>
                            </ToastAction>
                        ),
                    });
                    form.reset();
                    await queryClient.invalidateQueries({
                        queryKey: [CACHE_TAGS.FAQS],
                    });
                })
                .catch((err) => {
                    console.error(err);
                    toast({
                        variant: 'destructive',
                        description: 'Noe gikk galt:(',
                    });
                });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                description: 'Noe gikk galt:(',
            });
            return;
        }
     /*   toast({
            description: '🎉Innlegget er opprettet🎉',
            duration: 5000,
            action: (
                <ToastAction altText="Til FAQ-siden" className="border-black">
                    <Link href={`/faq`} onClick={() => toast}>
                        Til FAQ-siden{' '}
                    </Link>
                </ToastAction>
            ),
        });
        form.reset();*/
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
                            <FormMessage />
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
                                <Textarea
                                    placeholder={
                                        'Skriv et utfyllende svar på spørsmålet.'
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="bookableItemIds"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mt-5">
                            <FormLabel>
                                Gjelder spørsmålet noen spesifike gjenstander?
                            </FormLabel>
                            <FormControl>
                                <BookableItemsSelect
                                    field={field}
                                    form={form}
                                />
                            </FormControl>
                            <FormDescription>
                                Velg ingen, en, eller flere gjenstander
                            </FormDescription>
                        </FormItem>
                    )}
                ></FormField>

               { (groups ? groups.length>1 : false) &&
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mt-5">
                            <FormLabel>
                                Hvilke grupper gjelder dette spørsmålet?
                            </FormLabel>
                            <FormControl>
                                <GroupSelect
                                    field={field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                ></FormField>}

                <Button type="submit">{params?.questionId ? "Oppddater" : "Opprett"}</Button>
            </form>
        </Form>
    );
}
