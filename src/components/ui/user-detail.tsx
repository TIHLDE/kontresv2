import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';
import React from 'react';

interface UserDetailProps extends React.HTMLProps<HTMLDivElement> {
    image?: string;
    fullName?: string;
}

export const UserDetail = ({
    image,
    fullName,
    className,
    ...props
}: UserDetailProps) => {
    return (
        <div
            className={cn(
                'bg-secondary w-full rounded-lg p-5 flex flex-col place-content-center items-center gap-1',
            )}
            {...props}
        >
            <Avatar className="h-20 w-20">
                <AvatarImage src={image} alt={'profilbilde'} />
                <AvatarFallback>
                    <UserRound className="text-foreground" />
                </AvatarFallback>
            </Avatar>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {fullName},
            </h3>
            <p className="leading-7 text-center">
                Her kan du se og endre dine egne reservasjoner.
            </p>
        </div>
    );
};
