import { Card } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { Suspense } from "react";
import CreateFaqForm, { FaqFormValueTypes } from "./components/CreateFaqForm";
import { api } from "@/trpc/server";

export default async function page(){

   

    return(
        <div className="max-w-page mx-auto min-h-screen gap-5 justify-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit p-4">Opprett ny FAQ</h1>
            <Card className="p-4 h-fit w-full max-w-2xl">
                <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
                    <CreateFaqForm/>
                </Suspense>
            </Card>
        </div>
    )
}