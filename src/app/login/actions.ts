"use server"
import { signIn } from "@/auth";

export async function loginUser(username: string, password: string, redirectUrl = "/") {
    await signIn("tihlde", {
        redirectTo: redirectUrl,
        username,
        password,
    });
}