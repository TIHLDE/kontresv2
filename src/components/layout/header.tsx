import { User } from '@/types/User';

import Logo from '@/components/ui/logo';

import BookableItems from '../ui/bookable-items';
import HeaderLink from '../ui/header-link';
import HeaderWrapper from './header-wrapper';
import { UserArea } from './user-area';

interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
    userData: User;
}

export default function Header({ userData, className, ...props }: HeaderProps) {
    return (
        <HeaderWrapper className='md:flex hidden'>
            <nav className="flex gap-6 w-full items-center">
                <HeaderLink href="/" className="mr-16">
                    <Logo />
                </HeaderLink>
                <BookableItems className="flex gap-6" />
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
        </HeaderWrapper>
    );
}
