import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import FilterHeader from './components/filter-header/filter-header';
import AdminItemFilters from './components/item-filters/item-filters';
import { api } from '@/trpc/react';

export default function Page() {
    return (
        <>
            <CardHeader>
                <CardTitle>Gjenstander</CardTitle>
            </CardHeader>
            <CardContent>
                <FilterHeader />
            </CardContent>
        </>
    );
}
