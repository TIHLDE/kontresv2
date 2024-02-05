import { IFetch } from "./fetch"

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getUser = (user_id: string, password: string) => {
    return IFetch<string>({ url: `${baseUrl}/auth/login`, config: { method: "POST", body: JSON.stringify({user_id, password}), headers: {
        "Content-Type": "application/json"
      }}})
}