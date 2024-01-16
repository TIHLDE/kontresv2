import { Card } from "@/components/ui/card";
import EventForm from "./components/EventForm";
import { getItems } from "@/utils/apis/reservations";

export default async function Page() {
    let items;
    try {
        items = await getItems();
    } catch(err) {
        console.error(err);
        throw new Error(err as string)
    }

    return (
        <div className="max-w-7xl mx-auto h-screen mt-16">
            <h1 className="font-semibold my-5 text-3xl">Reserver en gjenstand</h1>
            <Card className="p-4">
                <EventForm items={items} />
            </Card>
        </div>
    )
}