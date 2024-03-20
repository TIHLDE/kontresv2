import Calendar from '../../components/ui/calendar/calendar';
import { getBookableItem, getReservations } from '../../utils/apis/reservations';


interface PageProps {
    params: {
        type: string;
    };
}
export default async function Page({ params: { type } }: PageProps) {
    let reservationRequest = await getReservations();

    let item = await getBookableItem(type);
    reservationRequest =
        reservationRequest?.filter(
            (booking) => type === booking?.bookable_item_detail?.id,
        ) ?? [];
    return (
        <div className="md:pt-20">
            <Calendar
                typeUUID={type}
                name={item.name}
                reservations={reservationRequest}
            />
        </div>
    );
}