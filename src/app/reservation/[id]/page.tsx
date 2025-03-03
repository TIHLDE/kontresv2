import { Card, CardContent } from '@/components/ui/card';

type ReservationPageParams = {
    params: { id: string };
};

export default async function Page({ params: { id } }: ReservationPageParams) {
    return (
        <div className="md:max-w-2xl max-w-page mx-auto min-h-screen w-full">
            <Card className="w-100">
                <CardContent className="flex gap-6 pt-6"></CardContent>
            </Card>
        </div>
    );
}
