import { getReservation } from '@/utils/apis/reservations';

const TitleWrapper = async ({ params }: { params: { id: string } }) => {
    const reservation = await getReservation(params.id);

    return (
        <h1 className="font-semibold my-3 text-3xl w-fit mx-auto mt-10 text-center">
            Reservasjon av{' '}
            <span className="lowercase">
                {reservation.bookable_item_detail.name}
            </span>
        </h1>
    );
};

export default TitleWrapper;
