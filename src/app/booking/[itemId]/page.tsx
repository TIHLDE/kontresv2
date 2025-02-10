import { Card, CardHeader } from "@/components/ui/card";
import { api } from '@/trpc/server';


type ItemPageParams ={
    params: { id: string};
}

export default async function Page({ params: { id }}: ItemPageParams) {
    console.log(id)
    const itemData = await api.bookableItem.getById({itemId: parseInt(id)}); //problemer med denne: nan
    console.log(itemData)
    return (
        <div className="container max-w-page">
            <Card>
                <CardHeader>
                    {itemData.name}
                </CardHeader>
            </Card>
        </div>
    );
}
