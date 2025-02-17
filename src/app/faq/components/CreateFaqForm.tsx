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
import GroupSelect from './groupSelect';
import { CACHE_TAGS } from '@/lib/cacheTags';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileUpload } from '@/components/ui/file-upload';
import { FaqFormValueTypes, formSchema } from './faqSchema';
import { getImageUrl } from './uploadFile';


export default function CreateFaqForm({question, questionId} : { question?: FaqFormValueTypes, questionId?: string}) {
    const { mutateAsync: createFaq } = api.faq.create.useMutation();
    const { mutateAsync: updateFaq } = api.faq.update.useMutation();
    const queryClient = useQueryClient();

    const [file, setFile] = useState<File>();

    const router = useRouter();

    const { data: session } = useSession();
    const token = session?.user.TIHLDE_Token
    const groups = session?.user.groups;

    const { toast } = useToast();

    const form = useForm<FaqFormValueTypes>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: '',
            answer: '',
            bookableItemIds: [],
            group: groups ? groups[0] : '',
            imageUrl:'',
        },
    });

    useEffect(() => {
        if (question) {
            form.reset({
                question: question?.question || '',
                answer: question?.answer || '',
                bookableItemIds: question.bookableItemIds || [],
                group: question?.group || (groups ? groups[0] : ''),
                imageUrl: question?.imageUrl || '', 
            });
        }
    }, [question, groups, form]);

    async function onSubmit(formData: FaqFormValueTypes) {
        try {
            const imageUrl = file && token ? await getImageUrl(file, token) : '';
            form.setValue("imageUrl", imageUrl);

            const faqData = {
                question: formData.question,
                answer: formData.answer,
                bookableItemIds: formData.bookableItemIds,
                author: `${session?.user?.firstName} ${session?.user?.lastName}`,
                group: formData.group || session?.user.leaderOf[0],
                imageUrl,
            };

            if (questionId) {
                await updateFaq({
                    ...faqData,
                    questionId: parseInt(questionId)
                })
            } else {
                await createFaq({
                    ...faqData,
                    groupId: '1' //må finne ut hva groupId skal være
                })
            }

            toast({
                description: questionId ? '✅ FAQ oppdatert!' : '🎉 FAQ opprettet!',
                duration: 5000,
                action: (
                    <ToastAction altText="Til FAQ-siden" className="border-black">
                        <Link href={`/faq`} onClick={() => toast}>Til FAQ-siden</Link>
                    </ToastAction>
                ),
            });

            await queryClient.invalidateQueries({ queryKey: [CACHE_TAGS.FAQS] });
            router.back();
        } catch (error) {
            console.error("Error i oppretting  av FAQ: ", error)
            toast({ variant: 'destructive', description: 'Noe gikk galt 😢' });
        }
    }

    function handleFileUpload(file: File): void {
        setFile(file);
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
                                        'Skriv et svar på spørsmålet.'
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

                {(groups ? groups.length > 1 : false) && (
                    <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                            <FormItem className="flex flex-col mt-5">
                                <FormLabel>
                                    Hvilke grupper gjelder dette spørsmålet?
                                </FormLabel>
                                <FormControl>
                                    <GroupSelect field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                )}

                <FormLabel>Last opp bilde</FormLabel>
                <FileUpload onChange={(files)=>{files[0] && handleFileUpload(files[0])}}/>

                <Button type="submit">
                    {questionId ? 'Oppdater' : 'Opprett'}
                </Button>
            </form>
        </Form>
    );
}
