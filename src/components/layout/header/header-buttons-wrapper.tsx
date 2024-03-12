import { getItems } from '@/utils/apis/items';
import { AdminPermissions, DetailedItem } from '@/utils/apis/types';
import { checkUserPermissions, getCurrentUserData } from '@/utils/apis/user';



import BookableItems from '../../ui/bookable-items';
import HeaderLink from '../../ui/header-link';
import Logo from '../../ui/logo';
import { UserArea } from '../user-area';

const HeaderButtonsWrapper = async () => {
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
        <>
            <nav className="flex gap-6 w-full items-center">
                <HeaderLink href="/" className="mr-16">
                    <Logo />
                </HeaderLink>
                <BookableItems className="flex gap-6" items={items} />
                <HeaderLink href="/booking">Booking</HeaderLink>
            </nav>

            {userData ? (
                <UserArea
                    username={userData?.user_id ?? ''}
                    image={userData?.image ?? ''}
                    admin={admin}
                />
            ) : undefined}
        </>
    );
};

export default HeaderButtonsWrapper;