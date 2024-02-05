import Image from 'next/image'
import Hero from './components/hero'
import { getUserData } from '@/utils/apis/TEMP'

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center">
			<Hero />
		</main>
	)
}
