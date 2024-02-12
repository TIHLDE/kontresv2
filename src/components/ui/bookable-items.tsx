import { getItems } from '../../utils/apis/items';
import HeaderLink from './header-link';

export default async function BookableItems() {
    const bookableItems = await getItems();
    console.log(bookableItems);
    return (
        <nav>
            {bookableItems.map((item, index) => (
                <HeaderLink key={index} href={'/' + item.id}>
                    {item.name}
                </HeaderLink>
            ))}
        </nav>
    );
}
