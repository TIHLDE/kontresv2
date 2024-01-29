import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/LoginForm";

export default function Page({ searchParams }: { searchParams?: { redirect?: string }}){
    const redirect_url = searchParams?.redirect ?? "/"
    const isLoggedin = Boolean(cookies().get("token"))
    if(isLoggedin) redirect(redirect_url)

    return <div className="max-w-page mx-auto h-screen flex flex-col justify-center items-center">
        <Card className="w-80">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm redirect={redirect_url} />
            </CardContent>
        </Card>
    </div>
}