import FaqCard from './components/faq-card';

export default async function page() {
    const data = [
        {
            description: 'Test',
            title: 'Test',
            user: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/264px-Huskiesatrest.jpg',
            },
        },
        {
            description: 'AHdajsdahdajdada',
            title: 'Test',
            user: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/264px-Huskiesatrest.jpg',
            },
        },
        {
            description: 'Test2',
            title: 'Test2',
            user: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/264px-Huskiesatrest.jpg',
            },
        },
    ];

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
