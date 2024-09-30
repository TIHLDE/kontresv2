import AuthTester from './components/auth-tester';
import Hero from './components/hero';
import ImageSection from './components/imagesection';
import { api } from '@/trpc/server';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

export default async function Home() {
    return (
        <main className="mx-auto max-w-page pb-10">
            <div>
                <Hero />
                Hello!
                <Suspense>
                    <ImageSection />
                </Suspense>
                <SessionProvider>
                    <AuthTester />
                </SessionProvider>
            </div>
        </main>
    );
}
