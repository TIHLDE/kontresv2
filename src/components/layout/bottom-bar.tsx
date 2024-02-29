'use client';

import { User } from '@/types/User';



import { Separator } from '@/components/ui/separator';

import { DetailedItem } from '@/utils/apis/types';
import { signOutUser } from '@/utils/apis/user';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '../ui/drawer';
import { MobileModeToggle, ModeToggle } from '../ui/theme-mode-toggler';
import { cn } from '@/lib/utils';
import {
    motion,
    useAnimate,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';
import { Menu, UserRound } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BottomBarProps extends React.HTMLProps<HTMLDivElement> {
    user?: User;
    items?: DetailedItem[];
    admin?: boolean;
}

const BottomBar = ({ user, admin, className, items, ...props }: BottomBarProps) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const router = useRouter();

    const { scrollYProgress } = useScroll();

    const scrollTransform = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const scrollSpring = useSpring(scrollTransform);

    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            scope.current,
            {
                y: 0,
            },
            {
                duration: 1,
                type: 'spring',
                delay: 0.4,
            },
        );
    }, [animate, scope]);

    const signOut = () => {
        setProfileOpen(false);
        signOutUser();
        router.refresh();
    };

    const goToCalendar = (uuid?: string) => {
        setMoreOpen(false);
        router.push(`${uuid}`);
    };

    return (
        <motion.div
            ref={scope}
            className={cn(
                className,
                'w-3/4 gap-5 bg-background border border-border py-3 place-content-center items-center flex rounded-3xl shadow-lg',
            )}
            initial={{ y: '200%' }}
            transition={{
                type: 'spring',
                delay: 0.5,
            }}
            drag
            dragConstraints={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
            dragTransition={{
                bounceStiffness: 800,
                power: 1,
            }}
            dragElastic={0.3}
        >
            <Button
                variant={'ghost'}
                onClick={() => {
                    if (!user) return;
                    setProfileOpen(!profileOpen);
                }}
                size={'lg'}
                className="px-0"
            >
                <Avatar className="w-full h-full aspect-square">
                    <AvatarImage src={user?.image} alt="Profililde" />
                    <AvatarFallback>
                        <UserRound className="text-foreground" />
                    </AvatarFallback>
                </Avatar>
            </Button>

            <Button
                className="aspect-square rounded-full h-16 shadow-md"
                onClick={() => setMoreOpen(!moreOpen)}
            >
                <Menu />
            </Button>
            <motion.div
                style={{
                    rotate: scrollSpring,
                }}
            >
                <MobileModeToggle variant={'ghost'} />
            </motion.div>

            <Drawer
                open={profileOpen}
                onOpenChange={(open) => setProfileOpen(open)}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Hei, {user?.first_name}!</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 p-4">
                        {}
                        <Button variant={'destructive'} onClick={signOut}>
                            Logg ut
                        </Button>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                className="w-full"
                                onClick={() => setProfileOpen(false)}
                            >
                                Lukk
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer open={moreOpen} onOpenChange={(open) => setMoreOpen(open)}>
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
                                onClick={() => setMoreOpen(false)}
                            >
                                Lukk
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </motion.div>
    );
};

export default BottomBar;