'use client';

import { DetailedReservation } from '../../../utils/apis/types';
import { useRouter } from 'next/navigation';

function hexColorFromUUID(uuid: string) {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
        hash = uuid.charCodeAt(i) + ((hash << 5) - hash);
    }
    let c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

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
    const router = useRouter();

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
            onClick={(e) => {
                router.push(`/reservasjon/${reservation.id}`);
                e.stopPropagation();
            }}
            className="absolute rounded-md shadow-lg border z-10"
            style={{
                top: top,
                left: left,
                width: width,
                height: height,
                backgroundColor: hexColorFromUUID(reservation.id),
            }}
        >
            <div className="text-xs text-white p-2">
                {/* Temporary calendar details */}
                <h2>@{reservation?.author_detail.user_id}</h2>
                {reservation?.group_detail && (
                    <h2>
                        På vegne av{' '}
                        <span className="underline">
                            {reservation?.group_detail?.name}
                        </span>
                    </h2>
                )}
                <p className="mt-2">{reservation?.start_time}</p>
                <p className="mt-1">{reservation?.end_time}</p>
            </div>
        </div>
    );
}
