"use server"

import { revalidateTag } from "next/cache";
import { IFetch } from "./fetch"
import { User } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getUser = (user_id: string, password: string) => {
  return IFetch<string>({
    url: `${baseUrl}/auth/login`, config: {
      method: "POST", body: JSON.stringify({ user_id, password }), headers: {
        "Content-Type": "application/json"
      }
    }
  })
}

/**
 * Gets user data from backend, including image link, gender, and more.
 */
export const getUserData = (user_id: User['user_id']) => {
  return IFetch<User>({
    url: `${baseUrl}/users/${user_id}`,
    config: {
      method: 'GET', next: {
        revalidate: 0
      }
    }
  })
}