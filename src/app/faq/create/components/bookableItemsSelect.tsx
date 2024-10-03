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

export default async function BookableItemsSelect(){
    const {data: bookableItems} = await api.faq.getAll.useQuery();

    return(
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Velg en gjenstand" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        bookableItems?.map((item, index) => (
                            <SelectItem value={item.questionId}>{item.author}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}