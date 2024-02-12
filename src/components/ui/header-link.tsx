import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default async function HeaderLink({
    href,
    className,
    children,
    ...props
}: LinkProps & { children?: ReactNode; className?: string }) {
    return (
        <Link
            className="p-2 font-medium hover:bg-primary/5 rounded-md transition-colors duration-150"
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
}
