import { User } from '@/types/User';

import { getGroupMemberships } from '@/utils/apis/groups';
import { getItems } from '@/utils/apis/items';
import { getCurrentUserData } from '@/utils/apis/user';

import ReservationForm from './ReservationForm';

const ReservationFormWrapper = async () => {
    let items;
    let userData;
    let groups;
    try {
        items = await getItems();
        userData = await getCurrentUserData();
        groups = (await getGroupMemberships(userData.user_id)).results;
    } catch (error) {}
    return (
        <>
            {items ? (
                <>
                    <h1 className="font-semibold my-3 text-3xl w-fit mx-auto">
                        Reserver en gjenstand
                    </h1>
                    <ReservationForm
                        items={items ?? []}
                        groups={groups ?? []}
                        user={userData as User}
                    />
                </>
            ) : (
                <h2>Det er ingen gjenstander å reservere</h2>
            )}
        </>
    );
};

export default ReservationFormWrapper;
