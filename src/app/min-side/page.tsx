import { getCurrentUserData } from '@/utils/apis/user';

const Page = async () => {
    const user = getCurrentUserData();

    return (
        <div className='max-w-page mx-auto flex flex-col place-content-center'
    )
};

export default Page;
