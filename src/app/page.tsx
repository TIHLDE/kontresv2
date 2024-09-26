import { SessionProvider } from 'next-auth/react';
import AuthTester from './components/authTester';
import Hero from './components/hero';
import ImageSection from './components/imagesection';
import { api } from '@/trpc/server';
import { Suspense } from 'react';

export default async function Home() {
    const hello = await api.post.hello({ text: 'Frikk Ormestad Larsen' });
    return (
        <main className="mx-auto max-w-page pb-10">
            <div>
                <Hero />
                Hello, {hello.greeting}!
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
