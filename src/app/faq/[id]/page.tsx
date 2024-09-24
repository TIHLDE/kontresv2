import { CardHeader, Card, CardContent, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";


export default async function Page(params: { id: number }) {

    const data = await api.faq.getById({questionId: params.id});

    return (
        <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="text-center">{data.question}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1>Test for å se om det ser fint ut</h1>
                </CardContent>
            </Card>
        </div>
    );
}