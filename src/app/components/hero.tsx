import { Button } from '@/components/ui/button';

import WelcomeTitle from "@/app/components/welcometitle";

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <div className="h-[110vh] w-full flex flex-col justify-center items-center relative overflow-x-hidden">
            <Image
                src="/kontoret.jpg"
                alt="Hero"
                width="800"
                height="800"
                className="-left-48 hover:-left-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 border -translate-x-1/2 absolute top-1/2 -translate-y-1/2 rounded-2xl shadow"
            />
            <Image
                src="/soundboks2.jpg"
                alt="Hero"
                width="800"
                height="800"
                className="-right-48 border hover:right-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 translate-x-1/2 absolute top-1/2 -translate-y-1/2 rounded-2xl shadow"
            />
            <WelcomeTitle />
            <p className="text-lg md:text-xl mt-8 mb-12 text-center text-muted-foreground">
                Her kan du booke kontoret, soundbox og utstyr, <br />
                om du er medlem i TIHLDE.
            </p>
            <div className="flex items-center">
                <Button className="m-2 p-8 text-lg group">
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-150" />
                    Reserver kontoret{' '}
                </Button>
                <Button className="m-2 p-8 text-lg group" variant="outline">
                    Reserver soundbox
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
                </Button>
            </div>
        </div>
    );
}
