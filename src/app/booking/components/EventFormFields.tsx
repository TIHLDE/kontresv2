import { Button } from "@/components/ui/button"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AutoSelect from "@/components/ui/select"
import { DetailedItem } from "@/utils/apis/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
    from: z.date(),
    to: z.date(),
    item: z.string(),
    description: z.string().min(10, {
        message: "Beskrivelsen må være mer enn 10 tegn lang"
    })
})

export type EventFormValueTypes = z.infer<typeof formSchema>

type EventFormFieldsType = {
    initialItem: string;
    items: DetailedItem[];
    onSubmit: (values: EventFormValueTypes) => void;
}

const EventFormFields = ({initialItem, items, onSubmit}: EventFormFieldsType) => {
    const form = useForm<EventFormValueTypes>({
        resolver: zodResolver(formSchema),
        shouldUnregister: false,
        defaultValues: {
            item: initialItem as string,
        }
    })

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
                            <FormLabel>Til dato</FormLabel>
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
                                )} placeholder={"Velg en gjenstand"} defaultValue={initialItem as string} onValueChange={field.onChange}{...field} />
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

export { EventFormFields };