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

export default function BookableItemsSelect({ field }){
    const {data: bookableItems} = api.bookableItem.getAll.useQuery();

    return(
        <Select defaultValue={field.value} onValueChange={field.onChange}>
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