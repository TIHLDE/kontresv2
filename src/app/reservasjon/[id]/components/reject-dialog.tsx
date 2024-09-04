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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface RejectDialogProps extends DialogProps {
    onReject: () => void;
}
const RejectDialog = ({ onReject, children, ...props }: RejectDialogProps) => {
    const formSchema = z.object({
        reason: z.string().min(1),
    });
    const form = useForm<{ reason: string }>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {};
    return (
        <Dialog {...props}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Avvise forespørsel</DialogTitle>
                    <DialogDescription>
                        For å avvise forespørselen må du oppgi en begrunnelse.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Begrunnelse</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Søknaden ble ikke godkjent fordi..."
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
                            <DialogClose asChild>
                                <Button
                                    type="submit"
                                    variant={'destructive'}
                                    onClick={onReject}
                                >
                                    Avvis
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default RejectDialog;
