import { getItems } from '@/utils/apis/items';

import ItemsTable from './ItemsTable';

const ItemsList = async () => {
    const items = await getItems();

    return <ItemsTable data={items} />;
};

export default ItemsList;
