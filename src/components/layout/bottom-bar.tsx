'use client';

import { User } from '@/types/User';

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
import { motion } from 'framer-motion';
import { Menu, UserRound } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BottomBarProps extends React.HTMLProps<HTMLDivElement> {
    user?: User;
}

const BottomBar = ({ user, className, ...props }: BottomBarProps) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();

    const signOut = () => {
        setProfileOpen(false);
        signOutUser();
        router.refresh();
    };

    return (
        <motion.div
            className={cn(
                className,
                'w-3/4 gap-5 bg-background border border-border py-3 place-content-center items-center flex rounded-3xl shadow-md',
            )}
            drag
            dragConstraints={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
            dragElastic={0.3}
        >
            <Button
                variant={'ghost'}
                onClick={() => {
                    setProfileOpen(!profileOpen);
                }}
                size={'lg'}
                className="px-0"
            >
                <Avatar className="w-full h-full">
                    <AvatarImage src={user?.image} alt="Profililde" />
                    <AvatarFallback>
                        <UserRound className="text-foreground" />
                    </AvatarFallback>
                </Avatar>
            </Button>

            <Button className="aspect-square rounded-full h-16 shadow-md">
                <Menu />
            </Button>

            <MobileModeToggle variant={'ghost'} />

            <Drawer open={profileOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Hei, {user?.first_name}!</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 p-4">
                        <Button variant={'outline'}>Min profil</Button>
                        <Button variant={'destructive'} onClick={signOut}>
                            Logg ut
                        </Button>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setProfileOpen(false);
                                }}
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
