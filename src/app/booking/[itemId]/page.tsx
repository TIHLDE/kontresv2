'use client';

import { Button } from '@/components/ui/button';

import { ChevronLeft } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import { useParams } from 'next/navigation';

export default function Page() {
    const router = useTransitionRouter();
    const params = useParams();
    function handleGoBack() {
        router.back();
    }
    return (
        <div className="container max-w-page">
            <Button onClick={handleGoBack}>
                <ChevronLeft /> Gå tilbake
            </Button>
            <h1 className="text-3xl font-semibold">Booking</h1>
            <p className="text-sm text-muted-foreground mb-5">
                Bla gjennom det TIHLDE har å tilby av kontor og utstyr
            </p>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <img
                        className="aspect-video object-cover"
                        src="https://images.unsplash.com/photo-1737251043885-1fa62cb12933?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="cover image"
                        style={{
                            viewTransitionName: `cover-image-${params.itemId}`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
