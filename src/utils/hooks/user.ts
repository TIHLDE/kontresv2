import { cookies } from "next/headers"
import { getUserData } from "../apis/user";
import { useState } from "react";
import { User } from "@/types/User";

interface StateType extends Partial<User> {
    loading: boolean;
}

export const useUser = async () => {
    const [data, setData] = useState<StateType>({
        loading: true,
    })

    const userId = cookies().get("user_id");
    // Get the user data

    getUserData(userId?.value ?? '').then((data) => {
        setData({
            ...data,
            loading: false
        })
    });

    return data;
}