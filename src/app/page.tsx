import Hero from './components/hero';
import { Suspense } from 'react';

export default async function Home() {
    return (
        <main className="mx-auto max-w-page pb-10">
            <div>
                <Hero />
                <Suspense>{/* <ImageSection /> */}</Suspense>
            </div>
        </main>
    );
}
