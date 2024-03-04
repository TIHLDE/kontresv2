import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';

import { DetailedItem } from '@/utils/apis/types';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface MoreProps {
    items?: DetailedItem[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const More = ({ items, open, setOpen }: MoreProps) => {
    const router = useRouter();

    const goToCalendar = (uuid?: string) => {
        setOpen(false);
        router.push(`/${uuid}`);
    };
    return (
        <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Hva ønsker du å gjøre?</DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-2 p-4">
                    {!items || items?.length === 0 ? (
                        <p className="mx-auto text-foreground">
                            Det er ingen gjenstander å reservere
                        </p>
                    ) : undefined}
                    {items?.map((item, _i) => (
                        <Button
                            variant={'outline'}
                            key={_i}
                            onClick={() => goToCalendar(item.id)}
                        >
                            Reserver {item.name}
                        </Button>
                    ))}
                    <Separator />
                    <Button variant={'outline'}>Kontakt oss!</Button>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button
                            className="w-full"
                            onClick={() => setOpen(false)}
                        >
                            Lukk
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default More;
