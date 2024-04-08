'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { signOutUser } from '@/utils/apis/user';
import { cn } from '@/utils/cn';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/theme-mode-toggler';
import { Settings, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserAreaProps extends React.HTMLProps<HTMLDivElement> {
    name: string;
    image: string;
    admin?: boolean;
}

export const UserArea = ({
    name,
    image,
    admin,
    className,
    ...props
}: UserAreaProps) => {
    // const { data, loading, error, signOut } = useUser();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const signOut = () => {
        setOpen(false);
        signOutUser();
        router.refresh();
    };

    const goToAdmin = () => {
        setOpen(false);
        router.push('/admin');
    };
    return (
        <div
            {...props}
            className={cn(
                'flex items-center justify-center w-fit gap-3',
                className,
            )}
        >
            <Popover onOpenChange={(open) => setOpen(open)} open={open}>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src={image} alt={'profilbilde'} />
                        <AvatarFallback>
                            <UserRound className="text-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="w-full flex flex-col items-center content-center">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={image} alt={'profilbilde'} />
                            <AvatarFallback>
                                <UserRound className="text-foreground" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Hei, {name}
                        </span>
                        <Button variant={'destructive'} className="mt-2 w-full">
                            Logg ut
                        </Button>
                        {admin ? (
                            <Button variant={'outline'} className="w-full mt-1">
                                Admin
                            </Button>
                        ) : undefined}
                    </div>
                </PopoverContent>
            </Popover>
            <ModeToggle />
        </div>
    );
};
