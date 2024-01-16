import { Card } from "@/components/ui/card";
import EventForm from "./components/EventForm";
import { getItems } from "@/utils/apis/reservations";

export default async function Page() {
    const items = await getItems();

    return (
        <div className="max-w-7xl mx-auto h-screen mt-16">
                <Card className="p-4">
                    <EventForm items={items} />
                </Card>
        </div>
    )
}