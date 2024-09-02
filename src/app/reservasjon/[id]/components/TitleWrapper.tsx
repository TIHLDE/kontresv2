import { getReservation } from '@/utils/apis/reservations';

import { cn } from '@/lib/utils';

interface TitleWrapperProps extends React.HTMLProps<HTMLHeadingElement> {
    params: { id: string };
}
const TitleWrapper = async ({
    params,
    className,
    ...props
}: TitleWrapperProps) => {
    const reservation = await getReservation(params.id);

    return (
        <h1
            className={cn(
                'font-semibold my-3 text-3xl w-fit mx-auto mt-10 text-center',
                className,
            )}
            {...props}
        >
            Reservasjon av{' '}
            <span className="lowercase">
                {reservation?.bookable_item_detail
                    ? reservation?.bookable_item_detail?.name
                    : 'ukjent gjenstand'}
            </span>
        </h1>
    );
};

export default TitleWrapper;
