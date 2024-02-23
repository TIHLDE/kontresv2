import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loadingspinner"
import AutoSelect, { SelectGroupType, SelectOptionType } from "@/components/ui/select"
import { DetailedItem } from "@/utils/apis/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
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
        message: 'Beskrivelsen må være mer enn 10 tegn lang',
    }),
});

export type EventFormValueTypes = z.infer<typeof formSchema>;

type ReservationFormFieldsType = {
    items: DetailedItem[];
    initialData?: Partial<z.infer<typeof formSchema>>;
    onSubmit: (values: EventFormValueTypes) => Promise<unknown>;
    groups?: SelectOptionType[] | SelectGroupType[];
    groupChangeCallback: Dispatch<SetStateAction<string>>
}

/**
 * Component that contains all of the fields that belong to the reservation form.
 */
const ReservationFormFields = ({ initialData, items, groups, groupChangeCallback, onSubmit }: ReservationFormFieldsType) => {
    const form = useForm<EventFormValueTypes>({
        resolver: zodResolver(formSchema),
        shouldUnregister: false,
        defaultValues: {
            application_on_behalf: "0",
            ...initialData
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
                            </FormControl >
                        </FormItem >
                    )}
                />

                < FormField
                    control={form.control}
                    name="to"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Til dato</FormLabel>
                            <FormControl>
                                <DateTimePicker className="flex w-full" {...field} value={field.value ? field.value : undefined} onChange={(e) => {
                                    form.setValue("to", e.target.value as unknown as Date, {
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }} />
                            </FormControl >
                        </FormItem >
                    )}
                />

                < FormField
                    control={form.control}
                    name="application_on_behalf"
                    render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel>Send inn søknad på vegne av</FormLabel>
                            <FormControl>
                                <AutoSelect
                                    options={groups ?? []}
                                    placeholder="Velg et alternativ"
                                    defaultValue="0"
                                    onValueChange={(e) => {
                                        groupChangeCallback(e);
                                        field.onChange(e);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Du kan kun sende inn forespørsler på vegne av grupper du er medlem av
                            </FormDescription>
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
                                )} placeholder={"Velg en gjenstand"} defaultValue={initialData?.item as string} onValueChange={field.onChange}{...field} className="w-full" />
                            </FormControl >
                        </FormItem>
                    )}
                />
                < FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Beskrivelse</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
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
                                Jeg godtar <Link href={"https://tihlde.org/wiki/tihlde/lover-og-regler/"} className="font-bold underline">vilkårene for bruk og utlån av TIHLDEs eiendeler</Link>
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <div className="mt-5">
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <LoadingSpinner /> : "Reserver"}</Button>
                </div >
            </form >
        </Form >
    );
};

export { ReservationFormFields as EventFormFields };
