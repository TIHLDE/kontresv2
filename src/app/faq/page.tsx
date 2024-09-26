import FaqCard from './components/faq-card';
import { api } from '@/trpc/server';

export default async function page() {
    const data = await api.faq.getAll();

    return (
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-5 w-fit">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
                FAQ
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                {data.map((object, index) => (
                    <FaqCard
                        description={object.answer}
                        title={object.question}
                        userImage={
                            'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'
                        }
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
