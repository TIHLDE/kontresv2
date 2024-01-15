import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<h1 className="text-6xl font-bold m-32">
				Lyst på noe for deg selv?
			</h1>
			<div>
				<Button className="m-2 p-8 text-lg group">
					Reserver kontoret{' '}
					<ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
				</Button>
				<Button className="m-2 p-8 text-lg group" variant="outline">
					Reserver soundbox
					<ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
				</Button>
			</div>
		</div>
	)
}
