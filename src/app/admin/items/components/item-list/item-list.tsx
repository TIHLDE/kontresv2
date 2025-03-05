import { HTMLAttributes } from 'react';

interface ItemListProps extends HTMLAttributes<HTMLDivElement> {}
export default function ItemList({ ...props }: ItemListProps) {
    return <div {...props}></div>;
}
