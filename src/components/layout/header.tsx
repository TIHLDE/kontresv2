import { User } from '@/types/User';
import { cn } from '@/utils/cn';
import { userAtom } from '@/utils/userAtom';
import { useAtom } from 'jotai';
import Image from 'next/image'
import _Link, { LinkProps } from 'next/link'
import { UserArea } from './user-area';
import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
	userData: User;
}

export default async function Header({ userData, className, ...props }: HeaderProps) {
	//const navItems = await fetch('')
	return (
		<header {...props} className={cn("p-4 min-h-[80px] backdrop-blur-sm top-0 sticky w-full bg-background/80 border-b border-border justify-start items-center flex z-50", className)}>
			<HeaderLink href="/" className="mr-16">
				<Image
					src="/tihlde.svg"
					alt="tihlde logo"
					width={200}
					height={40}
				/>
			</HeaderLink>
			<nav className='w-full'>
				<HeaderLink href="/kontoret">Reserver kontoret</HeaderLink>
				<HeaderLink href="/soundbox">Reserver soundbox</HeaderLink>
				<HeaderLink href="/reservasjoner">Reservasjoner</HeaderLink>
			</nav>


			{userData ? (
				<UserArea username={userData?.user_id ?? ''} image={userData?.image ?? ''} />
			) : (
				<p>Hvordan ser du dette??</p>
			)}
		</header>
	)
}

function HeaderLink({ href, className, children, ...props }: LinkProps & { children?: ReactNode; className?: string; }) {
	return (
		<Link
			className="p-2 font-medium hover:bg-primary/5 rounded-md transition-colors duration-150"
			href={href}
			{...props}
		>
			{children}
		</Link>
	)
}
