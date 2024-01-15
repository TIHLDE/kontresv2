import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EventForm from "./components/EventForm";

export default function Page() {
    return (
        <div className="max-w-7xl mx-auto h-screen mt-16">
                <Card className="p-4">
                    <EventForm />
                </Card>
        </div>
    )
}