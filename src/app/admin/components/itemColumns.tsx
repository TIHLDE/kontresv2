import { DetailedItem } from "@/utils/apis/types"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderButton } from "./reservationColumns"
import { ArrowUpDown, Delete, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Row } from "react-day-picker"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import ItemActions from "./item-actions"

export const itemColumns: ColumnDef<DetailedItem>[] = [
    {
        accessorKey: "name",
        header: "Gjenstand"
    },
    {
        accessorKey: "description",
        header: "Beskrivelse",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ItemActions item={row.original} />
    }
]