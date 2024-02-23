import { Card } from '@/components/ui/card';

export const revalidate = 0;

async function getData() {
    const res = await fetch('url goes here', { next: { revalidate: 3600 } });

    if (!res.ok) {
        throw new Error('Could not fetch data');
    }

    return await res.json();
}

export default async function Page() {
    //const data = await getData();

    return (
        <Card className="p-4 mx-auto w-2/5 my-16 pt-32">
            <h1 className="text-xl font-bold mb-4">Syrefest</h1>
            <h2 className="text-l font-bold mb-4">Kontoret</h2>
            <p className="mb-2">
                <strong>Fra:</strong> 18:00 - 11.11
            </p>
            <p className="mb-2">
                <strong>Til:</strong> 20:00 - 12.12
            </p>
            <p className="mb-2">
                <strong>Ansvarlig:</strong> Erik Skjellevik
            </p>
            <p className="mb-2">
                <strong>Status:</strong> PENDING
            </p>
        </Card>
    );
}
