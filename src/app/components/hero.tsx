import { Button } from '@/components/ui/button';

import styles from './welcometitle.module.css';
import WelcomeTitle from '@/app/components/welcometitle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <div className="h-[100vh] md:mt-[-5rem] w-full flex flex-col justify-center items-center relative overflow-x-hidden">
            <WelcomeTitle />

            <div className={`flex flex-col gap-0 ${styles.action}`}>
                <p className="text-lg md:text-xl md:mt-8 mt-3 md:mb-12 mb-6 text-center text-muted-foreground">
                    Her kan du booke kontoret, soundbox og utstyr, <br />
                    om du er medlem i TIHLDE.
                </p>
                <div className="flex items-center flex-col md:flex-row w-2/3 md:w-fit mx-auto">
                    <Button className="m-2 p-8 text-lg group w-full">
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-150 min-w-8" />
                        Reserver kontoret{' '}
                    </Button>
                    <Button
                        className="m-2 p-8 text-lg group w-full"
                        variant="outline"
                    >
                        Reserver soundbox
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150 min-w-8" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
