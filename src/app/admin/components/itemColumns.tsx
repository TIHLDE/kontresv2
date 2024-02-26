import { DetailedItem } from "@/utils/apis/types"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderButton } from "./reservationColumns"
import { ArrowUpDown } from "lucide-react"

export const itemColumns: ColumnDef<DetailedItem>[] = [
    {
        accessorKey: "name",
        header: "Gjenstand"
    },
    {
        accessorKey: "description",
        header: "Beskrivelse",
    },
]