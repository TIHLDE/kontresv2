import Hero from './components/hero';
import ImageSection from './components/imagesection';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="pb-10 max-w-page mx-auto">
            <div>
                <Hero />
                <Suspense>
                    <ImageSection />
                </Suspense>
            </div>
        </main>
    );
}
