'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ImageSectionProps extends React.HTMLProps<HTMLDivElement> {}
const ImageSection = ({ className, ...props }: ImageSectionProps) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div
            className={cn(
                'h-48 md:h-72 overflow-hidden flex items-center relative',
                className,
            )}
            {...props}
        >
            <Button
                className="absolute top-3 left-3 z-10 bg-white"
                onClick={goBack}
                aria-label="Gå tilbake til forrige side"
            >
                <ArrowLeft className="text-black" />
            </Button>
            <Image
                src={
                    'https://idsb.tmgrup.com.tr/ly/uploads/images/2023/05/31/275673.jpg'
                }
                layout="fill"
                alt="Dog."
                className="w-full h-full relative object-cover"
            />
            <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-t from-card from-20% to-transparent" />
        </div>
    );
};

export default ImageSection;
