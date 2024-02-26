"use server"

import { getUser } from "@/utils/apis/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ACCESS_TOKEN } from "../../../constants"

export const loginUser = async (user_id: string, password: string, redirect_url: string) => {
    return getUser(user_id, password).then((token) => {
        cookies().set(ACCESS_TOKEN, token.token)
        cookies().set("user_id", user_id)

        return redirect(redirect_url)
    })
}