import Calendar from '../../components/ui/calendar/calendar';
import { getReservations } from '../../utils/apis/reservations';

interface PageProps {
    params: {
        type: string;
    };
}
export default async function Page({ params: { type } }: PageProps) {
    let { reservations } = await getReservations();
    console.log(reservations);
    //bookings = bookings.filter((booking) => type === booking.bookable_item);
    return (
        <div className="pt-20">
            <Calendar type={type} reservations={reservations} />
        </div>
    );
}
