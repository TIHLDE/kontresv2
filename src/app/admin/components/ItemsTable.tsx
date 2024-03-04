'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

import { createItem, getItems, invalidateItems } from '@/utils/apis/items';
import { DetailedItem } from '@/utils/apis/types';

import CreateItemForm, { ItemFormValueTypes } from './create-item-form';
import { DataTable } from './data-table';
import { itemColumns } from './itemColumns';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const ItemsTable = ({ data }: { data: DetailedItem[] }) => {
    return (
        <DataTable
            columns={itemColumns}
            data={data}
            search
            filterProperty="name"
            headerItem={<CreateItem />}
            searchPlaceholder="Søk etter navn..."
        />
    );
};

const CreateItem = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const onSubmit = (e: ItemFormValueTypes) => {
        return createItem(e as DetailedItem)
            .then(() => {
                invalidateItems();
                toast({
                    title: 'Gjenstand opprettet!',
                    description: 'Den er nå tilgjengelig for alle.',
                });

                setOpen(false);
            })
            .catch((err) => {
                toast({
                    title: 'Noe gikk galt',
                    description: 'Kunne ikke opprette gjenstanden. ' + err,
                    variant: 'destructive',
                });
            });
    };

    return (
        <div className="w-full justify-end flex">
            <Dialog
                onOpenChange={(open) => {
                    setOpen(open);
                }}
                open={open}
            >
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="w-5 h-5 mr-1" />
                        Opprett ny
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Opprett en ny gjenstand</DialogTitle>
                        <DialogDescription>
                            Her kan du legge inn en ny gjenstand.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateItemForm onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItemsTable;
