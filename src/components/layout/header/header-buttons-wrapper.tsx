import { getItems } from '@/utils/apis/items';
import { AdminPermissions, type DetailedItem } from '@/utils/apis/types';
import { checkUserPermissions, getCurrentUserData } from '@/utils/apis/user';

import BookableItems from '../../ui/bookable-items';
import HeaderLink from '../../ui/header-link';
import Logo from '../../ui/logo';
import { UserArea } from '../user-area';
import { cn } from '@/lib/utils';

const HeaderButtonsWrapper = async ({
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => {
    let admin = false;
    let items: DetailedItem[] = [];
    let userData;

    try {
        userData = await getCurrentUserData();
        admin = await checkUserPermissions(AdminPermissions);
        items = await getItems();
    } catch (error) {
        console.error(error);
    }

    return (
        <div
            {...props}
            className={cn(
                'w-full h-full justify-start items-center flex',
                className,
            )}
        >
            <nav className="flex gap-6 w-full items-center">
                <HeaderLink href="/" className="mr-16">
                    <Logo />
                </HeaderLink>
                <BookableItems className="flex gap-6" items={items} />
                <HeaderLink href="/booking">Booking</HeaderLink>
            </nav>

            {userData ? (
                <UserArea
                    name={userData?.first_name ?? ''}
                    image={userData?.image ?? ''}
                    admin={admin}
                />
            ) : undefined}
        </div>
    );
};

export default HeaderButtonsWrapper;
