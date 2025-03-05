import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import ItemForm from './components/item-form';
import { api } from '@/trpc/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function ItemDialog() {
    const { mutate, isPending } = api.item.createItem.useMutation();
    const [open, setOpen] = useState(false);
    const utils = api.useUtils();

    const onSubmit = (values: {
        name: string;
        groupId: string;
        description: string;
        allowsAlcohol: boolean;
    }) => {
        mutate(values, {
            onSuccess: () => {
                // Invalidate existing items
                utils.item.invalidate();

                // Close the dialog
                setOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'outline'} className="gap-2.5">
                    <PlusIcon size={20} /> Ny gjenstand
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Legg til ny gjenstand</DialogTitle>
                    <DialogDescription>
                        Opprett en gjenstand som kan reserveres av alle TIHLDEs
                        medlemmer
                    </DialogDescription>
                </DialogHeader>

                <ItemForm
                    onSubmit={(values) =>
                        onSubmit({
                            ...values,
                            groupId: values.group,
                            allowsAlcohol: false,
                        })
                    }
                    isSubmitting={isPending}
                />
            </DialogContent>
        </Dialog>
    );
}
