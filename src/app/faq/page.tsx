import FaqCard from './components/faq-card';
import { api } from '@/trpc/server';

export default async function page() {
    const data = await api.faq.getAll();

    return (
        <div className="max-w-page mx-auto min-h-screen flex flex-col gap-5 w-fit">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
                FAQ
            </h1>
            <div className="grid grid-cols-3 gap-5">
                {data.map((object, index) => (
                    <FaqCard
                        description={object.description}
                        title={object.title}
                        userImage={object.user.image}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
