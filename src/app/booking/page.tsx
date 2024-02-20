import { Card } from "@/components/ui/card";
import ReservationForm from "./components/ReservationForm";
import { getItems } from "@/utils/apis/items";
import { DetailedItem } from "@/utils/apis/types";
import { getCurrentUserData } from "@/utils/apis/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

export default async function Page() {
    const items: DetailedItem[] = await getItems() as DetailedItem[];
    const userData = await getCurrentUserData();

    return (
        <div className="max-w-page mx-auto h-screen mt-16">
            <Card className="p-4 w-fit mx-auto">
                <h1 className="font-semibold my-3 text-3xl w-fit mx-auto">Reserver en gjenstand</h1>
                <ReservationForm items={items} />

                <div className="mt-10">
                    <p className="w-full text-center">Sender inn forespørsel som</p>
                    <Card className="p-2 w-fit mx-auto">
                        <div className="flex gap-5 items-center">
                            <Avatar className="rounded-lg">
                                <AvatarImage src={userData.image} alt="Profililde" />
                                <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                            </Avatar>
                            <h2>{userData.first_name}</h2>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    )
}