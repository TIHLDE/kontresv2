'use client';

import { Button } from '@/components/ui/button';

import { api } from '@/trpc/react';
import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

export function AdminFooter({ data }: { data?: Reservation }) {
    const updateStatus = api.reservation.updateStatus.useMutation();
    const router = useRouter();
    const handleApprove = async () => {
        try {
            await updateStatus.mutateAsync({
                reservationId: data?.reservationId || 0,
                status: 'APPROVED',
                groupId: data?.groupId || '',
            });
            router.refresh();
        } catch (error) {
            console.error('Error approving reservation:', error);
        }
    };

    const handleReject = async () => {
        try {
            await updateStatus.mutateAsync({
                reservationId: data?.reservationId || 0,
                status: 'REJECTED',
                groupId: data?.groupId || '',
            });
            router.refresh();
        } catch (error) {
            console.error('Error rejecting reservation:', error);
        }
    };

    return (
        <div className="flex justify-between padding-4 space-x-8">
            <Button type="submit" onClick={handleApprove}>
                Godkjenn
            </Button>
            <Button variant="destructive" onClick={handleReject}>
                Avslå
            </Button>
        </div>
    );
}

export function MemberFooter({ data }: { data?: Reservation }) {
    const updateStatus = api.reservation.updateStatus.useMutation();
    const router = useRouter();

    const handleCancel = async () => {
        try {
            await updateStatus.mutateAsync({
                reservationId: data?.reservationId || 0,
                status: 'REJECTED',
                groupId: data?.groupId || '',
            });
            router.refresh();
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    return (
        <div className="flex justify-between">
            <Button variant="destructive" onClick={handleCancel}>
                Kanseller
            </Button>
        </div>
    );
}
