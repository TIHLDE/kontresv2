'use client';

import { type DetailedReservation } from '../../../utils/apis/types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import * as React from 'react';

function hexColorFromUUID(uuid: string) {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
        hash = uuid.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

export default function ReservationShard({
    top,
    left,
    width,
    height,
    color,
    view,
    reservation,
    setRelativeMousePosition,
}: {
    top: number | string;
    left: number | string;
    width: number | string;
    height: number | string;
    color: string;
    view: 'week' | 'day';
    reservation: DetailedReservation;
    setRelativeMousePosition: (e: any) => void;
}) {
    const router = useRouter();
    const innerInfoRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    function Info() {
        return (
            <motion.div
                ref={innerInfoRef}
                className="text-xs text-neutral-900 p-2 relative overflow-hidden"
            >
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
                <p className="mt-2">
                    {format(reservation?.start_time, 'PPP, HH:MM', {
                        locale: nb,
                    })}
                </p>
                <p className="mt-1">
                    {' '}
                    {format(reservation?.end_time, 'PPP, HH:MM', {
                        locale: nb,
                    })}
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={wrapperRef}
            whileHover={{
                height:
                    innerInfoRef.current?.offsetHeight! >=
                    wrapperRef.current?.offsetHeight!
                        ? 'auto'
                        : height,
            }}
            transition={{
                duration: 0, //jævlig vanskelig å animate den her, 10 index poeng til den som klarer det (du kan kreve poengene hos mads)
            }}
            initial={{
                top: top,
                height: height,
                backgroundColor: hexColorFromUUID(reservation.id),
            }}
            style={{
                width: view == 'week' ? width : '100%',
                left: view == 'week' ? left : '0',
            }}
            onMouseEnter={(e) => {
                e.stopPropagation();
            }}
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
            className="absolute overflow-hidden rounded-md shadow-lg border z-10 cursor-pointer transition-all duration-300 ease-in-out"
        >
            <Info />
        </motion.div>
    );
}
