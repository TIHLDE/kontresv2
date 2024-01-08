import Image from 'next/image'
import _Link from 'next/link'

export default async function Header() {
	//const navItems = await fetch('')

	return (
		<header className="p-4 min-h-[80px] backdrop-blur-sm top-0 z-10 sticky w-full bg-background/80 border-b border-border flex justify-start items-center">
			<_Link href="/" className="mr-16">
				<Image
					src="/tihlde.svg"
					alt="tihlde logo"
					width={200}
					height={40}
				/>
			</_Link>
			<nav>
				<Link href="/kontoret">Reserver kontoret</Link>
				<Link href="/soundbox">Reserver soundbox</Link>
			</nav>
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
