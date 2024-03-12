import { getItems } from '@/utils/apis/items';
import { PermissionApp } from '@/utils/apis/types';
import { checkUserPermissions, getCurrentUserData } from '@/utils/apis/user';



import BottomBar from './bottom-bar';

const BottomBarWrapper = async () => {
    let user;
    let admin;
    let items;
    try {
        user = await getCurrentUserData();
        admin = await checkUserPermissions([PermissionApp.USER]);
        items = await getItems();
    } catch (e) {}

    return <BottomBar user={user} admin={admin} items={items} />;
};

export default BottomBarWrapper;