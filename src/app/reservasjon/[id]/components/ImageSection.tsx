'use client';

import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ImageSection = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="h-48 md:h-72 overflow-hidden flex items-center relative">
            <Button
                className="absolute top-3 left-3 z-10 bg-white"
                onClick={goBack}
            >
                <ArrowLeft className="text-black" />
            </Button>
            <Image
                src={
                    'https://www.southernliving.com/thmb/Rz-dYEhwq_82C5_Y9GLH2ZlEoYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-837898820-1-4deae142d4d0403dbb6cb542bfc56934.jpg'
                }
                layout="fill"
                alt="Dog."
                className="w-full h-full relative object-cover"
            />
            <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
};

export default ImageSection;
