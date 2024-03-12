import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ItemsList from './components/ItemsList';
import ReservationsList from './components/ReservationsList';
import { Suspense } from 'react';

const Admin = async () => {
    // Get the user
    return (
        <div className="max-w-page mx-auto min-h-screen md:w-full">
            <Card>
                <div className="w-full p-3">
                    <Tabs defaultValue="reservations" className="w-full">
                        <TabsList className="w-full [&>*]:w-full">
                            <TabsTrigger value="reservations">
                                Reservasjoner
                            </TabsTrigger>
                            <TabsTrigger value="items">Gjenstander</TabsTrigger>
                        </TabsList>
                        <TabsContent value="reservations">
                            <Suspense fallback={<h1>Laster</h1>}>
                                <ReservationsList />
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="items">
                            <Suspense fallback={<h1>Laster</h1>}>
                                <ItemsList />
                            </Suspense>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    );
};

export default Admin;
