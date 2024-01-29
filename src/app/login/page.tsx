import { Input } from "@/components/ui/input";
import { loginUser } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page({ searchParams }: { searchParams?: { redirect?: string }}){
    const _redirect = searchParams?.redirect ?? "/"
    const isLoggedin = Boolean(cookies().get("token"))
    if(isLoggedin) redirect(_redirect)


    return <div className="max-w-page mx-auto h-screen flex flex-col justify-center items-center">
        <Card className="w-80">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={loginUser} className="flex flex-col">
                    <input type="hidden" name="redirect" value={_redirect}/>
                    <Input placeholder="brukernavn" name="user_id" className="m-1 w-auto"/>
                    <Input placeholder="password" name="password" type="password" className="m-1 w-auto"/>
                    <Button type="submit" className="m-1">Login</Button>
                </form>
            </CardContent>
        </Card>
    </div>
}