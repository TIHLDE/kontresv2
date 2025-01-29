// import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import Calendar from './_components/calendar';

export default function CalendarPage() {
    const events = [
        {
            id: 1,
            title: 'Event 1',
            start: new Date(new Date().setHours(12, 0, 0, 0)),
            end: new Date(
                new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
                    9,
                    0,
                    0,
                    0,
                ),
            ),
        },
    ];

    return (
        <main className="flex p-2 gap-2 h-[calc(100vh_-_80px)]">
            <Card className="h-fit w-96">
                <CardHeader>
                    <CardTitle>Filter</CardTitle>
                </CardHeader>
            </Card>
            <Calendar events={events} />
        </main>
    );
}
