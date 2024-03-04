import { User } from '@/types/User';

import Logo from '@/components/ui/logo';

import { AdminPermissions, DetailedItem } from '@/utils/apis/types';
import { checkUserPermissions } from '@/utils/apis/user';

import BookableItems from '../../ui/bookable-items';
import HeaderLink from '../../ui/header-link';
import { UserArea } from '../user-area';
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
        <HeaderWrapper {...props} className="md:flex hidden">
            <Suspense fallback={<HeaderSkeleton />}>
                <HeaderButtonsWrapper />
            </Suspense>
        </HeaderWrapper>
    );
}
