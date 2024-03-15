import { buttonVariants } from '@/components/ui/button';

import { getItems } from '@/utils/apis/items';

import styles from './welcometitle.module.css';
import WelcomeTitle from '@/app/components/welcometitle';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Hero() {
    //TODO: burde kanskje håndtere fetch errors actionen istedet for hver enkelt call?
    let items;
    try {
        items = await getItems();
    } catch (e) {
        console.error(e);
    }

    console.log(items);
    console.log(items?.find((item) => item.name === 'Kontoret')?.id);

    return (
        <div className="h-[100vh] md:mt-[-5rem] w-full flex flex-col justify-center items-center relative overflow-x-hidden">
            <WelcomeTitle />

            <div className={`flex flex-col gap-0 ${styles.action}`}>
                <p className="text-lg md:text-xl md:mt-8 mt-3 md:mb-12 mb-6 text-center text-muted-foreground">
                    Her kan du som medlem i TIHLDE booke kontoret, <br></br> Soundboks eller annet utstyr.
                </p>
                <div className="flex items-center flex-col md:flex-row w-2/3 md:w-fit mx-auto">
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'default' }),
                            'm-2 p-8 text-lg group w-full',
                        )}
                        href={`/${
                            items?.find((item) => item.name === 'Kontoret')
                                ?.id ?? 'booking'
                        }`}
                    >
                        Reserver kontoret
                        <ArrowRight className="mr-2 group-hover:-translate-x-1 transition-transform duration-150 min-w-8" />
                    </Link>
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'm-2 p-8 text-lg group w-full',
                        )}
                        href={`/${
                            items?.find((item) => item.name === 'Soundboks')
                                ?.id ?? 'booking'
                        }`}
                    >
                        Reserver Soundboks
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150 min-w-8" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
