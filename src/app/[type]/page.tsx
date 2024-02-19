import Calendar from '../../components/ui/calendar/calendar';
import {
    getBookableItem,
    getReservations,
} from '../../utils/apis/reservations';

interface PageProps {
    params: {
        type: string;
    };
}
export default async function Page({ params: { type } }: PageProps) {
    let { reservations } = await getReservations();
    let item = await getBookableItem(type);
    console.log('item', item);
    reservations = reservations.filter(
        (booking) => type === booking.bookable_item,
    );
    return (
        <div className="lg:pt-20">
            <Calendar
                typeUUID={type}
                name={item.name}
                reservations={reservations}
            />
        </div>
    );
}
