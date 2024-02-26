"use client"

import { DetailedItem } from "@/utils/apis/types";
import { DataTable } from "./data-table"
import { itemColumns } from "./itemColumns"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import CreateItemForm, { ItemFormValueTypes } from "./create-item-form";
import { createItem, invalidateItems } from "@/utils/apis/items";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ItemsList = ({
    items
}: { items: DetailedItem[] }) => {

    return (
        <DataTable columns={itemColumns} data={items} search filterProperty="name" headerItem={<CreateItem />} searchPlaceholder="Søk etter navn..." />
    )
}

const CreateItem = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const onSubmit = (e: ItemFormValueTypes) => {
        return createItem(e).then(() => {
            invalidateItems();
            toast({
                title: "Gjenstand opprettet!",
                description: "Den er nå tilgjengelig for alle."
            })

            setOpen(false);
        })
    }

    return (
        <div className="w-full justify-end flex">
            <Toaster />
            <Dialog onOpenChange={(open) => { setOpen(open) }} open={open}>
                <DialogTrigger asChild>
                    <Button><Plus className="w-5 h-5 mr-1" />Opprett ny</Button>
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
    )
}

export default ItemsList;