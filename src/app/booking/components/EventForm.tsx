"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AutoSelect from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { DetailedItem } from "@/utils/apis/types";
import { Button } from "@/components/ui/button";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";

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

    const defaultItem = items.filter(a => a.id == itemUUID).length > 0 ? itemUUID : items[0].id 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        shouldUnregister: false,
        defaultValues: {
            item: defaultItem as string,
        }
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
                    render={({field, fieldState}) => (
                        <FormItem>
                            <FormLabel>Fra dato</FormLabel>
                            <FormControl>
                                <DateTimePicker className="flex" {...field} value={field.value ? field.value.toISOString() : undefined} onChange={(e) => {
                                    form.setValue("from", e.target.value as unknown as Date, {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="to"
                    render={({field, fieldState}) => (
                        <FormItem>
                            <FormLabel>Fra dato</FormLabel>
                            <FormControl>
                                <DateTimePicker className="flex" {...field} value={field.value ? field.value.toISOString() : undefined} onChange={(e) => {
                                    form.setValue("to", e.target.value as unknown as Date, {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }}/>
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
                                <AutoSelect options={(
                                    items.map(item => (
                                        {
                                            label: item.name,
                                            value: item.id
                                        }
                                    ))
                                )} placeholder={"Velg en gjenstand"} defaultValue={defaultItem as string} onValueChange={field.onChange}{...field} />
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
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>Forklar hvorfor akkurat <span className="font-bold italic">du</span> skal få innvilget søknaden!</FormDescription>
                        </FormItem>
                    )}
                />

                <div className="mt-5">
                    <Button type="submit">Reserver</Button>
                </div>
            </form>
        </Form>
    )
}

export default EventForm;