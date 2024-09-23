"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { signIn } from 'next-auth/react'
import { useState, useCallback } from "react";

const Page = () => {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(async () => {
        await signIn("credentials")
    }, [username, password])

    return (
        <div className="max-w-page mx-auto flex flex-col place-content-center">
            <Card>
                <CardTitle>Test Sign-in</CardTitle>
                <CardContent className="flex flex-col max-w-[30%]">
                    <label htmlFor="userName">Brukernavn</label>
                    <input type="text" name="usernane" id="userName" onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password">Passord</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit}>Login</button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
