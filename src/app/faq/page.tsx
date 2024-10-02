import { api } from "@/trpc/server";
import FaqCard from "./components/faq-card";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';


export default async function page() {
    const data = await api.faq.getAll();
    

    return(
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-5 w-fit">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">FAQ</h1>
                <Link href={"faq/create"}>
                    <Button><Plus className="w-5 h-5 mr-1" />Opprett ny</Button>
                </Link>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                {
                    data.map((object, index) => ( 
                        <Link href={`faq/${object.questionId}`} key={index}>
                            <FaqCard 
                                description={object.answer} 
                                title={object.question} 
                                bookableItems={object.bookableItems}
                                author={object.author}
                                group = {object.group}
                            />
                        </Link>
                     ))
                }
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`faq/${""}`} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href={`faq/${""}`}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`faq/${""}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
    </div>

    )
}