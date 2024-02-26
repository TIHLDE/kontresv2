import { DetailedItem } from "@/utils/apis/types";
import { DataTable } from "./data-table"
import { itemColumns } from "./itemColumns"

const ItemsList = ({
    items
}: { items: DetailedItem[] }) => {
    return (
        <DataTable columns={itemColumns} data={items} search filterProperty="name" searchPlaceholder="Søk etter navn..." />
    )
}

export default ItemsList;