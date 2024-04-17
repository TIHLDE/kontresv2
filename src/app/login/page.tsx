import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



import { checkUserAuth } from '@/utils/apis/user';

import { ACCESS_TOKEN } from '../../../constants';
import { LoginForm } from './components/LoginForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
    searchParams,
}: {
    searchParams?: { redirect?: string };
}) {
    const redirect_url = searchParams?.redirect ?? '/';

    const isLoggedin = await checkUserAuth();
    if (isLoggedin) redirect(redirect_url);

    return (
        /* This isn't a very elegant solution..? */
        <div className="max-w-page mx-auto h-screen -mt-24 flex flex-col justify-center items-center">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm redirect={redirect_url} />
                </CardContent>
            </Card>
        </div>
    );
}