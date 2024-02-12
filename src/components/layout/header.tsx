import { User } from '@/types/User';

import Logo from '@/components/ui/logo';

import { cn } from '@/utils/cn';

import BookableItems from '../ui/bookable-items';
import HeaderLink from '../ui/header-link';
import { UserArea } from './user-area';

interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
    userData: User;
}

export default function Header({ userData, className, ...props }: HeaderProps) {
    return (
        <header
            {...props}
            className={cn(
                'p-4 min-h-[80px] backdrop-blur-sm top-0 fixed w-full bg-background/80 border-b border-border justify-start items-center flex z-50',
                className,
            )}
        >
            <nav className="flex gap-2 w-full items-center">
                <HeaderLink href="/" className="mr-16">
                    <Logo />
                </HeaderLink>
                <BookableItems />
                <HeaderLink href="/reservation">Reservasjoner</HeaderLink>
                <HeaderLink href="/booking">Booking</HeaderLink>
            </nav>

            {userData ? (
                <UserArea
                    username={userData?.user_id ?? ''}
                    image={userData?.image ?? ''}
                />
            ) : (
                <p>Hvordan ser du dette??</p>
            )}
        </header>
    );
}
