"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


type ErrorPropType = {
    error: Error & { digest?: string }
}

export default function Error({error}: ErrorPropType) {
    return (
        <div className="max-w-7xl mx-auto h-screen mt-16">
            <h1 className="font-bold">Kræsj, pang, bom. Noe gikk galt.</h1>
            <h2 className="mt-2">Har du prøvd å skru PC-en av og på?</h2>
            <Accordion type="single" collapsible className="mt-10">
                <AccordionItem value="error">
                    <AccordionTrigger>Teknisk tullball</AccordionTrigger>
                    <AccordionContent>
                        <p className="font-bold">{error.message}</p>
                        <p>{error.stack}</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}