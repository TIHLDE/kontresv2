import {
    getBookableItem,
    getReservation,
} from '../../../utils/apis/reservations';

interface PageProps {
    params: {
        uuid: string;
    };
}
export default async function Page({ params: { uuid } }: PageProps) {
    const reservationDetails = await getReservation(uuid);
    let item = await getBookableItem(reservationDetails.bookable_item);

    return (
        <div className="md:pt-20 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-6xl font-semibold mb-4">
                    Reservasjon av {item.name}
                </h1>
                <h2 className="text-xl">
                    Reservert av {reservationDetails.author}
                </h2>
                <pre>{JSON.stringify(reservationDetails, null, 2)}</pre>
            </div>
        </div>
    );
}
