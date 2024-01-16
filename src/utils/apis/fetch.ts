import { stringify } from 'querystring';
import { ACCESS_TOKEN, TOKEN_HEADER_NAME } from '../../../constants';
import { cookies } from "next/headers";
import { init } from 'next/dist/compiled/webpack/webpack';
import { DetailedItem } from '@/utils/apis/types';

interface IFetchProps {
    url: string;
    config?: RequestInit
}

export const IFetch = <T extends unknown>({url, config}: IFetchProps) => {
  let headers: HeadersInit = {}
  headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string ?? "606d9b0894c798fa511d85f876fd8611b7109e32";
  headers = {
    ...headers,
    ...config?.headers
  }


  return fetch(url, {
    ...config,
    headers 
  }).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json() as T
  })
};