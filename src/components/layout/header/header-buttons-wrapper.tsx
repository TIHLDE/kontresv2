// import { getItems } from '@/utils/apis/items';
// import { AdminPermissions, type DetailedItem } from '@/utils/apis/types';
// import { checkUserPermissions, getCurrentUserData } from '@/utils/apis/user';
// import BookableItems from '../../ui/bookable-items';
import HeaderLink from '../../ui/header-link';
import Logo from '../../ui/logo';
import { UserArea } from '../user-area';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';

const HeaderButtonsWrapper = async ({
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => {
    const session = await auth();

    console.log(session);
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
                {/* <BookableItems className="flex gap-6" items={items} /> */}
                <HeaderLink href="/booking">Booking</HeaderLink>
            </nav>

            {session?.user ? (
                <UserArea
                    name={session.user.name ?? ''}
                    image={session.user.image ?? ''}
                    admin={session.user.role == 'ADMIN'}
                />
            ) : undefined}
        </div>
    );
};

export default HeaderButtonsWrapper;
