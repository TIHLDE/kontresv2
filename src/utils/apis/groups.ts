"use server"

import { IFetch } from "./fetch"
import { type Membership, type PaginationResponse } from "./types"

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getGroupMemberships = (user_id: string) => {
    return IFetch<PaginationResponse<Membership>>({
        url: `${baseUrl}/users/${user_id}/memberships/`,
        config: {
            method: "GET"
        }
    })
}