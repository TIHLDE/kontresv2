import Image from "next/image"

const ImageSection = () => {
    return (
        <div className="[&_img]:md:w-1/3 [&_img]:w-full [&>div]:md:gap-10 [&>div]:gap-5">
            <div className='w-full flex md:flex-row flex-col items-center justify-center'>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-semibold text-3xl'>Kontoret blablabla</h2>
                    <span className='text-foreground'>Kontoret er et fint kontor osvosv</span>
                </div>
                <Image
                    src="/kontoret.jpg"
                    alt="Hero"
                    width="800"
                    height="800"
                    className="border hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl shadow"
                />
            </div>
            <div className='w-full flex md:flex-row flex-col  items-center justify-center mt-10'>
                <Image
                    src="/soundboks2.jpg"
                    alt="Hero"
                    width="800"
                    height="800"
                    className="md:order-1 order-2 border hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl shadow"
                />
                <div className='flex flex-col gap-3 md:order-2 order-1'>

                    <h2 className='font-semibold text-3xl'>Soundboks blablabla</h2>
                    <span className='text-foreground'>Lager masse lyd etcetc</span>
                </div>
            </div>
        </div>
    )
}

export default ImageSection;