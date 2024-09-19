import { env } from "@/env";

export const loginToTIHLDE = async (
  username: string,
  password: string,
): Promise<string | null> => {
  const response = await fetch(`${env.LEPTON_API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: username, password }),
  });

  if (response.status !== 200) {
    console.error(response.status, response.statusText, await response.json());
    return null;
  }

  const payload = (await response.json()) as unknown as { token: string };

  return payload.token;
};