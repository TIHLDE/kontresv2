import { api } from "@/trpc/server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type QuestionPageParams = {
    params: {id: string}
}

export default async function Page({params: { id }}: QuestionPageParams) {

    const data = await api.faq.getById({questionId: parseInt(id)});
    return (
        <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle className="text-left">{data.question}</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.answer}
                </CardContent>
                <CardContent className="text-sm text-muted-foreground">
                    {data.group}
                </CardContent>
                <CardContent className="text-sm text-muted-foreground">
                    {data.author}
                </CardContent>
            </Card>
        </div>
    );
}