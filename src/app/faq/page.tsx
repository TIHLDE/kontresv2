"use client"

import FaqCard from "./components/faq-card";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { api } from "@/trpc/react";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import FAQListSkeleton from "./components/faq-list-skeleton";


export default function page() {
    const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} = api.faq.getAll.useInfiniteQuery({
        limit: 9,
    },
    {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
)


import FaqCard from './components/faq-card';
import { api } from '@/trpc/server';
import { Plus } from 'lucide-react';
import Link from 'next/link';


    return (
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-5 w-full">
            <div className='flex justify-between'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
                FAQ
            </h1>
            <Link href={'faq/create'} className="w-fit">
                <Button>
                    <Plus className="w-5 h-5 mr-1" />
                    Opprett ny
                </Button>
            </Link>
            </div>
            {hasNextPage}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                {
                    data?.pages.map((page) => page.faqs.map(object => (
                        <Link href={`faq/${object.questionId}`} key={object.questionId}>
                              <FaqCard 
                                  description={object.answer} 
                                  title={object.question} 
                                  bookableItems={object.bookableItems}
                                  author={object.author}
                                  group = {object.group}
                              />
                          </Link>
                    )))    
                }                
            </div>
            {
                isLoading && <FAQListSkeleton />
            }
            <div className="max-w-page mx-auto flex gap-5">
                {
                    hasNextPage && <Button onClick={() => fetchNextPage()}>
                    {
                        isFetchingNextPage && <LoadingSpinner />
                    }
                    {
                        !isFetchingNextPage && "Last inn flere"
                    }
                </Button>
                }
                
            </div>
            
    </div>

    )
}
