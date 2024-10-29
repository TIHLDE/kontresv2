import { Card } from '@/components/ui/card';

export default async function Page() {
    return (
        <div className="max-w-page mx-auto min-h-screen flex md:flex-row flex-col gap-5 justify-center">
            <Card className="p-4 h-fit w-full max-w-2xl"></Card>
        </div>
    );
}
