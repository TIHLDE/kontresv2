import { Card } from "@/components/ui/card";
import EventForm from "./components/ReservationForm";
import { getItems } from "@/utils/apis/items";
import { DetailedItem } from "@/utils/apis/types";

export default async function Page() {
    const items: DetailedItem[] = await getItems() as DetailedItem[];

    return (
        <div className="max-w-page mx-auto h-screen mt-16">
            <h1 className="font-semibold my-5 text-3xl w-fit mx-auto md:mx-0">Reserver en gjenstand</h1>
            <Card className="p-4">
                <EventForm items={items} />

                    <div className="mt-10">
                    <p>Sender inn forespørsel som</p>
                    <Card className="p-2 md:w-fit w-full">
                        <div className="flex gap-5 items-center">
                            <div className="aspect-square h-20 border-solid border-4 border-gray-300 rounded-lg">Bilde</div>
                            <h3>Ola Nordmann</h3>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    )
}