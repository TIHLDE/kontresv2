import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.string().url().optional().nullable(),
    allowsAlcohol: z.boolean().optional(),
});

export type ItemFormValueTypes = z.infer<typeof formSchema>;

export interface CreateItemFormProps {
    onSubmit: (values: ItemFormValueTypes) => Promise<unknown>;
    initialData?: Partial<ItemFormValueTypes>;
}

export const CreateItemForm = ({
    onSubmit,
    initialData,
}: CreateItemFormProps) => {
    const form = useForm<ItemFormValueTypes>({
        resolver: zodResolver(formSchema),
        shouldUnregister: false,
        defaultValues: initialData,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Navn</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
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
                                <Input type="text" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>Bilde (ikke støttet enda)</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    disabled
                                    value={value ?? ''}
                                    {...rest}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="allowsAlcohol"
                    render={({ field: { value, ...rest } }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox
                                    checked={value}
                                    {...rest}
                                    onCheckedChange={(e) => {
                                        form.setValue(
                                            'allowsAlcohol',
                                            Boolean(e.valueOf()),
                                            {
                                                shouldDirty: true,
                                                shouldTouch: true,
                                            },
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormLabel className="mt-0 space-y-0">
                                Tillater alkohol
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-5 w-full md:w-fit">
                    Lagre
                </Button>
            </form>
        </Form>
    );
};
export default CreateItemForm;
