import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import FilterHeader from './components/filter-header/filter-header';
import ItemList from './components/item-list/item-list';
import { api } from '@/trpc/server';

export default async function Page() {
    const items = await api.item.getItems({});
    return (
        <>
            <CardHeader>
                <CardTitle>Gjenstander</CardTitle>
            </CardHeader>
            <CardContent className="gap-2.5 flex flex-col">
                <FilterHeader />
                <ItemList items={items.items} />
            </CardContent>
        </>
    );
}
