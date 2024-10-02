import { api } from "@/trpc/server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge"
import Link from 'next/link';   


type QuestionPageParams = {
    params: { id: string };
};

export default async function Page({ params: { id } }: QuestionPageParams) {
    const data = await api.faq.getById({ questionId: parseInt(id) });

    const { answer: description, question: title, author, group, bookableItems } = data;
    return (
        <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle className="text-left">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {description}
                </CardContent>
                <CardContent className="text-xs text-muted-foreground">
                    {author}, {group}
                </CardContent>
                <CardContent>
                {bookableItems.map((bookableItem, index) => (
                    <Link href={`./${""}`}> <Badge key={index} className="m-1 ">
                            {bookableItem.name}
                        </Badge>
                    </Link>                        
                    ))}
                </CardContent>
            </Card> 
        </div>
    );
}