"use server"

import { getUser } from "@/utils/apis/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginUser = async (user_id: string, password: string, redirect_url: string) => {
    const token = await getUser(user_id, password)

    cookies().set("token", token)

    return redirect(redirect_url)
}