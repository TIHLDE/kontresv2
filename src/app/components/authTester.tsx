"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { api } from "@/trpc/react";
import { SessionProvider, signIn, useSession } from "next-auth/react";

export default function AuthTester() {
    
    const session = useSession();

    const { data: adminData, isSuccess: adminSuccess } = api.post.adminTest.useQuery();
    const { data: memberData, isSuccess: memberSuccess } = api.post.memberTest.useQuery();

    
    return (
        <SessionProvider>
            {session.status == "unauthenticated" && <Card>
                <h1>Du er ikke logget inn</h1>
                <Button onClick={() => signIn()}>Logg inn</Button>
            </Card>}
            {session.status == "loading" && <Card>
                <h1>Loading authentication status</h1>
                <LoadingSpinner />
            </Card>}
            <Card className="p-5 my-5">
                <h1>Session Data</h1>
                <pre>{JSON.stringify(session.data, null, 4)}</pre>
            </Card>
            <Card className="p-5 my-5">
                <h1>Admin Data</h1>
                { !adminSuccess && <p className="text-red-500">Failed to fetch admin data</p> }
                { adminSuccess && (
                    <>
                        <p className="text-green-500">Successfully fetched admin data</p>
                        <pre>{JSON.stringify(adminData, null, 4)}</pre>
                    </>
                ) }
            </Card>

            <Card className="p-5 my-5">
                <h1>Member Data</h1>
                { !memberSuccess && <p className="text-red-500">Failed to fetch member data</p> }
                { memberSuccess && (
                    <>
                        <p className="text-green-500">Successfully fetched member data</p>
                        <pre>{JSON.stringify(memberData, null, 4)}</pre>
                    </>
                ) }
            </Card>
        </SessionProvider>
    )
}