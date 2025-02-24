import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import FaqList from './components/faq-list';
import { auth } from '@/auth';
import { api } from '@/trpc/server';
import Link from 'next/link';

export default async function page() {
    const session = await auth();
    const isAdmin = session?.user.role === 'ADMIN';

    return (
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-10 w-full">
            <div className="flex flex-row justify-between items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
                    FAQ
                </h1>
                {isAdmin && (
                    <Link href={'./faq/edit/'} className="w-fit">
                        <Button>Opprett ny</Button>
                    </Link>
                )}
            </div>
            <FaqList />
        </div>
    );
}
