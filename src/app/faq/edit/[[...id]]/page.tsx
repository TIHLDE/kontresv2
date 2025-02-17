'use client'

import { Card } from '@/components/ui/card';

import CreateFaqForm from '../../components/CreateFaqForm';
import { SessionProvider } from 'next-auth/react';
import { api } from '@/trpc/react';
import {useRouter} from 'next/router';
import { useParams } from "next/navigation";
import { FaqFormValueTypes } from '../../components/faqSchema';


export default function page() {

    const params = useParams();
    const questionId = params.id as string
    const { data: updateQuestion, isLoading } = api.faq.getById.useQuery({
                questionId: parseInt(questionId),
            }) 

    const question = {
        question: updateQuestion?.question,
        answer: updateQuestion?.answer,
        bookableItemIds: updateQuestion?.bookableItems?.map((item) => item.itemId),
        group: updateQuestion?.group,
        imageUrl:updateQuestion?.imageUrl,
    } as FaqFormValueTypes

    return (
        <SessionProvider>
            <div className="max-w-2xl mx-auto min-h-screen gap-5 justify-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit p-4">
                    Edit FAQ
                </h1>
                <Card className="p-4 h-fit max-w-2xl">
                    <CreateFaqForm key={questionId} question={question} questionId={questionId}/>
                </Card>
            </div>
        </SessionProvider>
    );
}
