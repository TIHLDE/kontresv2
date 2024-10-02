import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import FaqCard from './components/faq-card';
import { api } from '@/trpc/server';
import Link from 'next/link';

export default async function page() {
    const data = await api.faq.getAll();

    return (
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-5 w-fit">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
                FAQ
            </h1>
            <div className="grid grid-cols-3 gap-5">
                {data.map((object, index) => (
                    <Link href={`faq/${object.questionId}`} key={index}>
                        <FaqCard
                            description={object.answer}
                            title={object.question}
                            userImage={
                                'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'
                            }
                            key={index}
                            questionId={object.questionId}
                        />
                    </Link>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`faq/${''}`} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href={`faq/${''}`}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`faq/${''}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
