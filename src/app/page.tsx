import Image from 'next/image'
import Hero from './components/hero'
import ImageSection from './components/imagesection'

export default function Home() {
	return (
		<main className="pb-10 max-w-page mx-auto">
			<div>
				<Hero />
				<ImageSection />
			</div>
		</main >
	)
}
