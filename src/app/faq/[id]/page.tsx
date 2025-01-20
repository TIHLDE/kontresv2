import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { auth } from '@/auth';
import { api } from '@/trpc/server';
import Image from 'next/image';
import Link from 'next/link';

type QuestionPageParams = {
    params: { id: string };
};

export default async function Page({ params: { id } }: QuestionPageParams) {
    const data = await api.faq.getById({ questionId: +id });
    const session = await auth();
    let isAdmin = session?.user.role === 'ADMIN';

    return (
        <div>
            <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center gap-5">
                <Card className="w-100">
                    <CardHeader>
                        <CardTitle className="text-left">
                            {data?.question}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>{data?.answer}</CardContent>
                    <CardContent className="text-xs text-muted-foreground">
                        {data?.author}, {data?.group}
                    </CardContent>
                    <CardContent>
                        {data?.bookableItems.map((bookableItem, index) => (
                            <Link href={`./${''}`}>
                                <Badge key={index} className="m-1 ">
                                    {bookableItem.name}
                                </Badge>
                            </Link>
                        ))}
                        {data.imageUrl != '' && (
                            <Image
                                className="rounded-lg"
                                src={data.imageUrl}
                                width={500}
                                height={500}
                                alt=""
                            />
                        )}
                    </CardContent>
                </Card>
                {isAdmin && (
                    <Link href={`./edit/${id}`} className="w-fit">
                        <Button>Rediger</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
