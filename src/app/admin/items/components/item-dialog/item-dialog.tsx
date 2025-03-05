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
import { PlusIcon } from 'lucide-react';

export default function ItemDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'outline'} className="gap-2.5">
                    <PlusIcon /> Ny gjenstand
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

                <ItemForm />

                <DialogFooter>
                    <Button>Mor di</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
