"use server"

import { revalidateTag } from "next/cache";
import { IFetch } from "./fetch"
import { PermissionApp, User, UserPermissions } from "./types";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "../../../constants";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getUser = (user_id: string, password: string) => {
  return IFetch<{ token: string }>({
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

/**
 * Automatically finds the user id cookie, and gets the associated user data. 
 */
export const getCurrentUserData = async () => {
  const id = await cookies().get("user_id");
  return getUserData(id?.value ?? '');
}

/**
 * Removes token and user_id cookies, which effectively logs the user out.
 * The client must also perform a reload for the middleware to redirect to
 * the login page.
 */
export const signOutUser = () => {
  // Delete cookies
  cookies().delete("user_id");
  cookies().delete(ACCESS_TOKEN);
}

export const getUserPermissions = () => {
  return IFetch<UserPermissions>({
    url: `${baseUrl}/users/me/permissions`,
    config: {
      method: 'GET',
      next: {
        tags: ["user_permissions"]
      }
    }
  })
}

export const checkUserPermissions = (apps: PermissionApp[]) => {
  return getUserPermissions().then(perms => (
    apps.some(app => perms?.permissions?.[app].write ?? perms?.permissions?.[app].write_all)
  ))
}