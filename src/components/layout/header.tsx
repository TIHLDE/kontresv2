import { User } from '@/types/User';
import { cn } from '@/utils/cn';
import { userAtom } from '@/utils/userAtom';
import { useAtom } from 'jotai';
import Image from 'next/image'
import _Link from 'next/link'
import { UserArea } from './user-area';

interface HeaderProps extends React.HTMLProps<HTMLHeadElement> {
	userData: User;
}

export default async function Header({ userData, className, ...props }: HeaderProps) {
	//const navItems = await fetch('')
	return (
		<header {...props} className={cn("p-4 min-h-[80px] backdrop-blur-sm top-0 sticky w-full bg-background/80 border-b border-border justify-start items-center flex z-50", className)}>
			<_Link href="/" className="mr-16">
				<Image
					src="/tihlde.svg"
					alt="tihlde logo"
					width={200}
					height={40}
				/>
			</_Link>
			<nav className='w-full'>
				<Link href="/kontoret">Reserver kontoret</Link>
				<Link href="/soundbox">Reserver soundbox</Link>
				<Link href="/reservasjoner">Reservasjoner</Link>
			</nav>


			{userData ? (
				<UserArea username={userData?.user_id ?? ''} image={userData?.image ?? ''} />
			) : (
				<p>Hvordan ser du dette??</p>
			)}
		</header>
	)
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<_Link
			className="p-2 font-medium hover:bg-primary/5 rounded-md transition-colors duration-150"
			href={href}
		>
			{children}
		</_Link>
	)
}
