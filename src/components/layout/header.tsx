import { User } from '@/types/User';

import Logo from '@/components/ui/logo';

import BookableItems from '../ui/bookable-items';
import HeaderLink from '../ui/header-link';
import HeaderWrapper from './header-wrapper';
import { UserArea } from './user-area';
import { AdminPermissions, DetailedItem, PermissionApp } from '@/utils/apis/types';
import { checkUserPermissions } from '@/utils/apis/user';

interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
    userData?: User;
    items?: DetailedItem[];
}

export default async function Header({ userData, items, className, ...props }: HeaderProps) {
    if (!userData) return;

    // Fetch user admin data
    let admin: boolean;
    try {
        admin = await checkUserPermissions(AdminPermissions)
    } catch (error) {
        admin = false;
        console.log(error);
    }

    return (
        <HeaderWrapper className='md:flex hidden'>
            <nav className="flex gap-6 w-full items-center">
                <HeaderLink href="/" className="mr-16">
                    <Logo />
                </HeaderLink>
                <BookableItems className="flex gap-6" items={items} />
                <HeaderLink href="/reservation">Reservasjoner</HeaderLink>
                <HeaderLink href="/booking">Booking</HeaderLink>
            </nav>

            {userData ? (
                <UserArea
                    username={userData?.user_id ?? ''}
                    image={userData?.image ?? ''}
                    admin={admin}
                />
            ) : (
                <p>Hvordan ser du dette??</p>
            )}
        </HeaderWrapper>
    );
}
