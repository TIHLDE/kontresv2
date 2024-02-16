import { DetailedReservation } from '../../../utils/apis/types';

export default function ReservationShard({
    top,
    left,
    width,
    height,
    color,
    reservation,
    setRelativeMousePosition,
}: {
    top: number | string;
    left: number | string;
    width: number | string;
    height: number | string;
    color: string;
    reservation: DetailedReservation;
    setRelativeMousePosition: (e: any) => void;
}) {
    return (
        <div
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseOver={(e) => e.stopPropagation()}
            onMouseLeave={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setRelativeMousePosition(null);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseMove={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setRelativeMousePosition(null);
            }}
            className="absolute rounded-md bg-red-600 p-1"
            style={{
                top: top,
                left: left,
                width: width,
                height: height,
                backgroundColor: color,
            }}
        >
            <div className="text-xs text-white p-1">
                {reservation.description}
            </div>
        </div>
    );
}
