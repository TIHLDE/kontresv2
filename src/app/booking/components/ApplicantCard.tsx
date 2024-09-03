import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';
import React from 'react';

interface ApplicantCardProps extends React.HTMLProps<HTMLDivElement> {
    label?: string;
    image?: string;
}

/**
 * Used for displaying the "Sender inn forespørsel som" card at the bottom of the reservation form.
 */
const ApplicantCard = ({
    label,
    image,
    className,
    ...props
}: ApplicantCardProps) => {
    return (
        <div className={cn('mt-8', className)} {...props}>
            <p className="w-full text-center">Sender inn forespørsel som</p>
            <Card className="p-3 w-fit my-2 mx-auto">
                <div className="flex justify-center gap-2 items-center">
                    <Avatar className="rounded-lg">
                        <AvatarImage src={image} alt="Profililde" />
                        <AvatarFallback>
                            <UserRound className="text-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <h2>{label}</h2>
                </div>
            </Card>
        </div>
    );
};

export default ApplicantCard;
