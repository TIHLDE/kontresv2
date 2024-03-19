import { User } from '@/types/User';



import { DetailedItem } from '@/utils/apis/types';



import HeaderButtonsWrapper from './header-buttons-wrapper';
import HeaderSkeleton from './header-skeleton';
import HeaderWrapper from './header-wrapper';
import { Suspense } from 'react';


interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
    userData?: User;
    items?: DetailedItem[];
}

export default async function Header({ className, ...props }: HeaderProps) {
    return (
        <HeaderWrapper {...props}>
            <Suspense fallback={<HeaderSkeleton />}>
                <HeaderButtonsWrapper />
            </Suspense>
            <div className='md:hidden flex'>

            </div>
        </HeaderWrapper>
    );
}