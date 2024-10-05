"use client"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookableItem } from "@prisma/client";
import { Dropdown } from "react-day-picker";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import BookableItemsSelect from "./bookableItemsSelect";

const formSchema = z.object({
    question: z.string(),
    answer: z.string(),
    bookableItemId: z.number(),
})

export type FaqFormValueTypes = z.infer<typeof formSchema>;

export interface CreateFaqProps {
    onSubmit: (values: FaqFormValueTypes) => Promise<unknown>
}

export default function createFaqForm(){
    const {mutateAsync: createFaq} = api.faq.create.useMutation();


    async function onSubmit(formData: FaqFormValueTypes){
        console.log(formData.bookableItemId)
        try {
            await createFaq({
            question: formData.question,
            answer: formData.answer,
            group: "KOK",
            author:"Daniel",
            bookableItemId: formData.bookableItemId,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const form = useForm<FaqFormValueTypes>({
        resolver: zodResolver(formSchema)
    });

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
                                    <FormDescription>
                                    Hvilket spørsmål skal besvares?
                                    </FormDescription>
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
                                        <Input 
                                            type="textfield"
                                            placeholder={"Skriv et utfyllende svar på spørsmålet."}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                    Skriv et utfyllende svar på spørsmålet
                                    </FormDescription>
                                </FormItem>
                            )} 
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="bookableItemId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gjelder spørsmålet en spesifik gjenstand?</FormLabel>
                                    <FormControl>
                                        <BookableItemsSelect field={field}/>
                                    </FormControl>
                                </FormItem>
                            )} 
                        >
                        </FormField>

                        <Button type="submit">Opprett</Button>
                    </form>
                </Form>
    )
}