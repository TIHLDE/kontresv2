import Hero from './components/hero';
import ImageSection from './components/imagesection';
import LoginButton from './login/components/LoginButton';
import { Suspense } from 'react';

export default async function Home() {
    return (
        <main className="mx-auto max-w-page pb-10">
            <div>
                <Hero />
                <LoginButton />
                <Suspense>
                    <ImageSection />
                </Suspense>
            </div>
        </main>
    );
}