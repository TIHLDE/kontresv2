import Image from 'next/image'
import Hero from './components/hero'

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center overflow-x-hidden pb-10">
			<Hero />
			<div className='w-full flex gap-10 items-center justify-center'>
				<div className='flex flex-col gap-3'>

					<h2 className='font-semibold text-3xl'>Kontoret blablabla</h2>
					<span className='text-foreground'>Kontoret er et fint kontor osvosv</span>
				</div>
				<Image
					src="/kontoret.jpg"
					alt="Hero"
					width="800"
					height="800"
					className="border hover:shadow-2xl hover:scale-105 w-1/3 transition-all duration-300 rounded-2xl shadow"
				/>
			</div>
			<div className='w-full flex gap-10 items-center justify-center mt-10'>
				<Image
					src="/soundboks2.jpg"
					alt="Hero"
					width="800"
					height="800"
					className="border hover:shadow-2xl hover:scale-105 w-1/3 transition-all duration-300 rounded-2xl shadow"
				/>
				<div className='flex flex-col gap-3'>

					<h2 className='font-semibold text-3xl'>Soundboks blablabla</h2>
					<span className='text-foreground'>Lager masse lyd etcetc</span>
				</div>
			</div>

		</main>
	)
}
