import { CardHeader, Card, CardContent, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";

type QuestionPageParams = {
    params: {id: string}
}

export default async function Page({params: { id }}: QuestionPageParams) {

    const data = await api.faq.getById({questionId: parseInt(id)});
    return (
        <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="text-center">{data.question}</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.answer}
                </CardContent>
            </Card>
        </div>
    );
}