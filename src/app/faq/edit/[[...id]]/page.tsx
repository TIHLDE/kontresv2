import { Card } from '@/components/ui/card';

import CreateFaqForm, { FaqFormValueTypes } from './components/CreateFaqForm';
import { SessionProvider } from 'next-auth/react';

type EditPageParams = {
    params: { id?: string };
};

export default async function page({params: {id}}: EditPageParams) {
    return (
        <SessionProvider>
            <div className="max-w-2xl mx-auto min-h-screen gap-5 justify-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit p-4">
                    {id ? "Edit FAQ" : "Opprett ny FAQ"}
                </h1>
                <Card className="p-4 h-fit max-w-2xl">
                    <CreateFaqForm questionId={id}/>
                </Card>
            </div>
        </SessionProvider>
    );
}
