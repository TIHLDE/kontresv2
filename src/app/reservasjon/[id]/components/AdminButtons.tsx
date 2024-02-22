"use client"

import { Button } from "@/components/ui/button"

const AdminButtons = () => {
    return (
        <div className="w-full flex gap-3 p-5">
            <Button className="w-full">Godkjenn</Button>
            <Button className="w-full" variant={"destructive"}>Avslå</Button>
        </div>
    )
}

export default AdminButtons;