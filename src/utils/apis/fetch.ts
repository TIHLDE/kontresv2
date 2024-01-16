import { stringify } from 'querystring';
import { ACCESS_TOKEN, TOKEN_HEADER_NAME } from '../../../constants';
import { cookies } from "next/headers";
import { init } from 'next/dist/compiled/webpack/webpack';

interface IFetchProps {
    url: string;
    config?: RequestInit
}

export const IFetch = <T extends unknown>({url, config}: IFetchProps) => {
  const headers: HeadersInit = {}
  headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string

  return fetch(url, {
    ...config,
    method: "POST",
    headers: {
        ...config?.headers,
        ...headers
    }
  }).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json() as Promise<{data: T}>
  }).then(data => {return data.data})
};