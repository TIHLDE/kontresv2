"use client"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BookableItemsSelect from "./bookableItemsSelect";
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const formSchema = z.object({
    question: z.string().min(1, {
        message: "Du må legge inn et spørsmål", 
      }),
    answer: z.string().min(1, {
        message: "Legg inn et svar på spørsmålet",
      }),
    bookableItemIds: z.array(z.number()),
})

export type FaqFormValueTypes = z.infer<typeof formSchema>;

export default function createFaqForm(){
    const {mutateAsync: createFaq} = api.faq.create.useMutation();

    const { toast } = useToast();

    const form = useForm<FaqFormValueTypes>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            answer: "",
            bookableItemIds: [],
        }
    });

    async function onSubmit(formData: FaqFormValueTypes){
        try {
            await createFaq({
                question: formData.question,
                answer: formData.answer,
                group: "KOK",
                author:"Daniel",
                bookableItemIds: formData.bookableItemIds, 
            });
        } catch (error) {
            console.error(error)
        }
        toast({
            description: "🎉Innlegget er opprettet🎉",
            duration: 5000,
            action: 
                <ToastAction altText="Til FAQ-siden" className="border-black">
                    <Link href={`/faq`} onClick={() => toast}>Til FAQ-siden </Link>
                </ToastAction>
        });
        form.reset();
    }

    return(
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
                                            placeholder={"Hvilket spørsmål skal besvares?"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Svar</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={"Skriv et utfyllende svar på spørsmålet."}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="bookableItemIds"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-5">
                                    <FormLabel>Gjelder spørsmålet noen spesifike gjenstander?</FormLabel>
                                    <FormControl>
                                        <BookableItemsSelect field={field} form={form}/>
                                    </FormControl>
                                    <FormDescription>
                                        Velg ingen, en, eller flere gjenstander
                                    </FormDescription>
                                </FormItem>
                            )} 
                        >
                        </FormField>

              
                        <Button type="submit">Opprett</Button>
                    </form>
                </Form>
    )
}
