

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailedReservation, User } from "@/utils/apis/types";
import { getCurrentUserData } from "@/utils/apis/user";
import { DataTable } from "./components/data-table";
import { getReservations } from "@/utils/apis/reservations";
import { reservationColumns } from "./components/reservationColumns";
import ReservationsList from "./components/ReservationsList";
import ItemsList from "./components/ItemsList";
import { getItems } from "@/utils/apis/items";

const Admin = async () => {
    // Get the user
    let user: User;
    try {
        user = await getCurrentUserData();
    } catch (error) {
        console.error(error);
    }

    const reservations = await getReservations();
    const items = await getItems();

    return (
        <div className="max-w-page mx-auto min-h-screen md:w-full">
            <Card>
                <div className="w-full p-3">
                    <Tabs defaultValue="reservations" className="w-full">
                        <TabsList className="w-full [&>*]:w-full">
                            <TabsTrigger value="reservations">Reservasjoner</TabsTrigger>
                            <TabsTrigger value="items">Gjenstander</TabsTrigger>
                        </TabsList>
                        <TabsContent value="reservations">
                            <ReservationsList reservations={reservations} />
                        </TabsContent>
                        <TabsContent value="items">
                            <ItemsList items={items} />
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}

export default Admin;