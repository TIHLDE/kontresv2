import { getCurrentUserData, getUserData } from "../apis/user";
import { useState } from "react";
import { User } from "@/types/User";

interface StateType extends Partial<User> {
    loading: boolean;
}

export const useUser = () => {
    const [data, setData] = useState<User>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const signOut = () => {

    }

    const obj = {
        data,
        loading,
        error,
        signOut
    }

    getCurrentUserData().then((data) => {
        setLoading(false);
        setData(data)
    }).catch(() => { setError(true) });

    return obj;
}