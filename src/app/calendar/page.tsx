import { Card, CardContent, CardHeader } from '@/components/ui/card';

import Calendar from './_components/calendar';

export default function CalendarPage() {
    return (
        <main className="flex flex-1 gap-2 m-2">
            <Card className="w-64">
                <CardHeader>Filter</CardHeader>
            </Card>
            <Card className="flex-grow flex flex-col">
                <CardHeader>Calendar</CardHeader>
                <CardContent
                    className="flex-1 overflow-auto"
                    style={{ contain: 'size' }}
                >
                    <Calendar events={[]} />
                </CardContent>
            </Card>
        </main>
    );
}
