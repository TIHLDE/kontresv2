import { Card } from "@/components/ui/card";
import ReservationForm from "./components/ReservationForm";
import { getItems } from "@/utils/apis/items";
import { DetailedItem } from "@/utils/apis/types";
import { getCurrentUserData } from "@/utils/apis/user";
import { getGroupMemberships } from "@/utils/apis/groups";

export default async function Page() {
    const items: DetailedItem[] = await getItems() as DetailedItem[];
    const userData = await getCurrentUserData();
    const groups = (await getGroupMemberships(userData.user_id)).results;

    return (
        <div className="max-w-page mx-auto h-screen mt-16">
            <Card className="p-4 w-fit mx-auto">
                <h1 className="font-semibold my-3 text-3xl w-fit mx-auto">Reserver en gjenstand</h1>
                <ReservationForm items={items} groups={groups} user={userData} />
            </Card>
        </div>
    )
}