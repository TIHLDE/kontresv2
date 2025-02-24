'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';

export default function ReservationPage() {
    const router = useRouter();

    return (
        <Dialog
            defaultOpen={true}
            onOpenChange={(open) => {
                if (!open) {
                    router.back();
                }
            }}
        >
            <DialogContent>
                <h1>Reservation Modal Page</h1>
            </DialogContent>
        </Dialog>
    );
}
