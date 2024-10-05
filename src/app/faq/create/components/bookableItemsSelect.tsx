"use client"

import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem,  
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { api } from "@/trpc/react";

export default async function BookableItemsSelect({ field }){
    const {data: bookableItems} = await api.bookableItem.getAll.useQuery();

    return(
        <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Velg en gjenstand" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        bookableItems?.map((item, index) => (
                            <SelectItem value={item.itemId.toString()} key={index}>{item.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}