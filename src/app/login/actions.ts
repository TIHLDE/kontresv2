"use server"

import { getUser } from "@/utils/apis/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginUser = async (data: FormData) => {
    console.log(data)
    const user_id = data.get("user_id")?.toString() ?? ''
    const password = data.get("password")?.toString() ?? ''
    const _redirect = data.get("redirect")?.toString() ?? ''

    console.log(_redirect)

    const token = await getUser(user_id, password)

    cookies().set("token", token)

    return redirect(_redirect)
}