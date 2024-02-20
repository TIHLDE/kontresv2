import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ComboBox } from "@/components/ui/combobox"
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
    // Must be checked
    accepted_rules: z.boolean().refine(val => val === true, {
        message: "Du må godta vilkårene for å kunne reservere"
    }),
    application_on_behalf: z.string(),
    description: z.string().min(10, {
        message: "Beskrivelsen må være mer enn 10 tegn lang"
    })
})

export type EventFormValueTypes = z.infer<typeof formSchema>

type ReservationFormFieldsType = {
    initialItem: string;
    items: DetailedItem[];
    onSubmit: (values: EventFormValueTypes) => void;
}

/**
 * Component that contains all of the fields that belong to the reservation form.
 */
const ReservationFormFields = ({ initialItem, items, onSubmit }: ReservationFormFieldsType) => {
    const form = useForm<EventFormValueTypes>({
        resolver: zodResolver(formSchema),
        shouldUnregister: false,
        defaultValues: {
            item: initialItem as string,
            application_on_behalf: "0",
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="from"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Fra dato</FormLabel>
                            <FormControl>
                                <DateTimePicker className="flex w-full" {...field} value={field.value ? field.value.toISOString() : undefined} onChange={(e) => {
                                    form.setValue("from", new Date(e.target.value), {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="to"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Til dato</FormLabel>
                            <FormControl>
                                <DateTimePicker className="flex w-full" {...field} value={field.value ? field.value.toISOString() : undefined} onChange={(e) => {
                                    form.setValue("to", e.target.value as unknown as Date, {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="application_on_behalf"
                    render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel>Send inn søknad på vegne av</FormLabel>
                            <FormControl>
                                <AutoSelect
                                    options={[{ label: "Meg selv", value: "0" }, { label: "Index", value: "1" }, { label: "Hovedstyret", value: "2" }]}
                                    placeholder="Velg et alternativ"
                                    defaultValue="0"
                                    onValueChange={field.onChange}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
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
                                )} placeholder={"Velg en gjenstand"} defaultValue={initialItem as string} onValueChange={field.onChange}{...field} className="w-full" />
                            </FormControl>
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
                                <Input type="text" {...field} className="w-full" />
                            </FormControl>
                            <FormDescription>Forklar hvorfor akkurat <span className="font-bold italic">du</span> skal få innvilget søknaden!</FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="accepted_rules"
                    render={({ field: { value, ...rest } }) => (
                        <FormItem className="mt-10 flex items-center space-x-2">
                            <FormControl>
                                <Checkbox {...rest} checked={value} onCheckedChange={(e) => {
                                    form.setValue("accepted_rules", Boolean(e.valueOf()), {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }} />
                            </FormControl>
                            <FormLabel>
                                Jeg godtar vilkårene for bruk og utlån av TIHLDEs eiendeler
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <div className="mt-5">
                    <Button type="submit" className="w-full">Reserver</Button>
                </div>
            </form>
        </Form>
    )
}

export { ReservationFormFields as EventFormFields };