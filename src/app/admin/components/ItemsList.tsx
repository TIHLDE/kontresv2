import { getItems } from '@/utils/apis/items';

import ItemsTable from './items-table';

const ItemsList = async () => {
    let items;
    try {
        items = await getItems();
    } catch (error) {}

    return <ItemsTable data={items ?? []} />;
};

export default ItemsList;
