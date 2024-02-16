import { getItems } from '../../utils/apis/items';
import HeaderLink from './header-link';

export default async function BookableItems({
    className,
}: {
    className?: string;
}) {
    let bookableItems = await getItems();
    bookableItems = bookableItems.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <nav className={className}>
            {bookableItems.map((item, index) => (
                <HeaderLink key={index} href={'/' + item.id}>
                    {item.name}
                </HeaderLink>
            ))}
        </nav>
    );
}
