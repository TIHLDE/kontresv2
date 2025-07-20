import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ReservationForm from './_components/reservation-form';

export default function NewBookingPage() {
    return (
        <main className="flex justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Reserver en gjenstand</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReservationForm />
                </CardContent>
            </Card>
        </main>
    );
}
