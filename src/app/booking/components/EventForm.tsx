"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProps, UseFormReturn, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useSearchParams } from "next/navigation";
import { DetailedItem } from "@/utils/apis/types";

const formSchema = z.object({
    from: z.date(),
    to: z.date(),
    item: z.string(),
    description: z.string().min(10, {
        message: "Beskrivelsen må være mer enn 10 tegn lang"
    })
})

type EventFormType = {
    items: DetailedItem[];
}

const EventForm = ({items}: EventFormType) => {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const itemUUID = searchParams.get("itemUUID")

    console.log(items)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="from"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Fra dato</FormLabel>
                            <FormControl>
                                <Input type="date"></Input>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="to"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Til dato</FormLabel>
                            <FormControl>
                                <Input type="date"></Input>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="item"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Gjenstand</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kontoret" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Boomboks">Boomboks</SelectItem>
                                        <SelectItem value="Kontoret">Kontoret</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Beskrivelse</FormLabel>
                            <FormControl>
                                <Input type="text" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default EventForm;