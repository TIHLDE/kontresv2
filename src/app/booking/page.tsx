import { Card } from "@/components/ui/card";
import ReservationForm from "./components/ReservationForm";
import { getItems } from "@/utils/apis/items";
import { DetailedItem } from "@/utils/apis/types";
import { getCurrentUserData } from "@/utils/apis/user";
import { getGroupMemberships } from "@/utils/apis/groups";
import { User } from "@/types/User";

export default async function Page() {
    let items;
    let userData;
    let groups;
    try {
        items = await getItems();
        userData = await getCurrentUserData();
        groups = (await getGroupMemberships(userData.user_id)).results;
    } catch (error) {}

    return (
        <div className="max-w-page mx-auto min-h-screen">
            <Card className="p-4 w-fit mx-auto">
                {
                    items ?
                    <>
                        <h1 className="font-semibold my-3 text-3xl w-fit mx-auto">Reserver en gjenstand</h1>
                        <ReservationForm items={items ?? []} groups={groups ?? []} user={userData as User} />
                    </> : <h2>Det er ingen gjenstander å reservere</h2>
                }
            </Card>
        </div>
    );
}
