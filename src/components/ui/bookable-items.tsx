import { type DetailedItem } from '@/utils/apis/types';

import { getItems } from '../../utils/apis/items';
import HeaderLink from './header-link';

interface BookableItemsProps extends React.HTMLProps<HTMLAreaElement> {
    items?: DetailedItem[];
}

export default async function BookableItems({
    className,
    items,
    ...props
}: BookableItemsProps) {
    const bookableItems = items?.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <nav className={className} {...props}>
            {bookableItems?.map((item, index) => (
                <HeaderLink key={index} href={'/calendar/' + item.id}>
                    {item.name}
                </HeaderLink>
            ))}
        </nav>
    );
}
