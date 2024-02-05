"use server"

import { getUser } from "@/utils/apis/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginUser = async (user_id: string, password: string, redirect_url: string) => {
    return getUser(user_id, password).then((token) => {
        cookies().set("token", token)

        return redirect(redirect_url)
    })
}