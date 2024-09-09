'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-alert-dialog';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface StateDialogProps extends DialogProps {
    onStateChange: (reason: string) => void;
    title: string;
    reasonRequired?: boolean;
    fieldLabel: string;
}
const StateDialog = ({
    onStateChange,
    reasonRequired = true,
    title,
    fieldLabel,
    children,
    open,
    onOpenChange,
    ...props
}: StateDialogProps) => {
    const [dialogOpen, setDialogOpen] = useState(open);

    const formSchema = z.object({
        reason: reasonRequired ? z.string().min(1) : z.string(),
    });
    const form = useForm<{ reason: string }>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setDialogOpen(false);
        onStateChange(values.reason);
    };

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={(state) => {
                setDialogOpen(state);
                onOpenChange?.(state);
            }}
            {...props}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {reasonRequired
                            ? 'For å gjennomføre denne handlingen må du oppgi en begrunnelse.'
                            : 'Dersom det trengs kan du oppgi tillegsinformasjon for brukeren.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{fieldLabel}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Lorem ipsum..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="secondary">Avbryt</Button>
                            </DialogClose>
                            <Button type="submit">Bekreft</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default StateDialog;
