import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { deleteItem, invalidateItems, updateItem } from '@/utils/apis/items';
import { type DetailedItem } from '@/utils/apis/types';

import CreateItemForm, { type ItemFormValueTypes } from './create-item-form';
import { MoreHorizontal, Trash } from 'lucide-react';
// import { resolve } from 'path';
import { useState } from 'react';

const ItemActions = ({ item }: { item: DetailedItem }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { toast } = useToast();

    const onSubmit = (e: ItemFormValueTypes) => {
        return updateItem(item.id, e as DetailedItem)
            .then(() => {
                toast({
                    title: 'Gjenstand oppdatert!',
                    description: 'Gjenstanden er nå oppdatert.',
                });
                invalidateItems();

                setEditOpen(false);
            })
            .catch((err) => {
                toast({
                    title: 'Noe gikk galt',
                    description: 'Kunne ikke oppdatere gjenstanden. ' + err,
                    variant: 'destructive',
                });
            });
    };

    const onDelete = () => {
        deleteItem(item.id)
            .then(() => {
                toast({
                    title: 'Gjenstand slettet!',
                    description: 'Gjenstanden er nå slettet.',
                });
                invalidateItems();
            })
            .catch((err) => {
                toast({
                    title: 'Noe gikk galt',
                    description: 'Kunne ikke slette gjenstanden. ' + err,
                    variant: 'destructive',
                });
                invalidateItems();
            });
    };

    return (
        <div className="flex gap-3 justify-end place-content-center">
            {/* Item row dropdown menu */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={'ghost'} className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Vis flere handlinger</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            setEditOpen(!editOpen);
                        }}
                    >
                        Rediger
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            setDeleteOpen(!deleteOpen);
                        }}
                    >
                        Slett
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit item dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rediger gjenstand</DialogTitle>
                        <DialogDescription>
                            Her kan du redigere gjenstanden
                        </DialogDescription>
                    </DialogHeader>

                    <CreateItemForm initialData={item} onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>

            {/* Delete item dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Det du er i ferd med å gjøre kan ikke angres. Er du
                            helt sikker?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Avbryt</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive"
                            onClick={onDelete}
                        >
                            <Trash className="w-4 h-4" />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ItemActions;
