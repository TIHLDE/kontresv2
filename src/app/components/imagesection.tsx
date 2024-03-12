import { getItems } from '@/utils/apis/items';
import { cn } from '@/utils/cn';

import Image from 'next/image';

const ImageSection = async () => {
    let items;
    try {
        items = await getItems();
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="flex flex-col gap-5">
            {items?.map((item, i) => (
                /* When image support is eventually added, the image cards will automatically be displayed. */
                item.image ? <ImageTextCard
                    key={i}
                    image={item.image}
                    title={item.name}
                    description={item.description}
                    align={i % 2 === 0 ? 'right' : 'left'}
                /> : undefined                
            ))}
        </div>
    );
};

interface ImageTextCardProps extends React.HTMLProps<HTMLDivElement> {
    image?: string;
    title?: string;
    description?: string;
    align?: 'left' | 'right';
}

const ImageTextCard = ({
    image,
    title,
    description,
    className,
    align = 'left',
    ...props
}: ImageTextCardProps) => {
    return (
        <div
            {...props}
            className={cn(
                'w-full flex flex-col items-center justify-center md:gap-10 gap-5 md:flex-row',
                className,
            )}
        >
            <div
                className={`flex flex-col gap-3 ${align === 'right' ? 'order-1' : 'md:order-2'}`}
            >
                <h2 className="font-semibold text-3xl text-center">{title}</h2>
                <span className="text-foreground">{description}</span>
            </div>
            <Image
                src={image ?? ''}
                alt="Hero"
                width="800"
                height="800"
                className={`border hover:shadow-2xl hover:scale-105 transition-all w-full duration-300 rounded-2xl shadow md:w-1/3 ${align === 'right' ? 'md:order-2 order-1' : 'order-1'}`}
            />
        </div>
    );
};

export default ImageSection;
