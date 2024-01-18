"use server"

import { stringify } from 'querystring';
import { ACCESS_TOKEN, TOKEN_HEADER_NAME } from '../../../constants';
import { cookies } from "next/headers";
import { init } from 'next/dist/compiled/webpack/webpack';
import { DetailedItem } from '@/utils/apis/types';

interface IFetchProps {
    url: string;
    config?: RequestInit
}

export interface ErrorType {
  status?: number;
  statusText?: string;
  response?: Record<string,unknown>;
}

export const IFetch = <T extends unknown>({url, config}: IFetchProps) => {
  let headers: HeadersInit = {}
  headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string ?? "606d9b0894c798fa511d85f876fd8611b7109e32"; // <= Token for INDEX user in dev db
  headers = {
    ...headers,
    ...config?.headers
  }


  return fetch(url, {
    ...config,
    headers 
  })
  .then(async res => {
    if (!res.ok) {
      const message = await res.json();
      const errorObject: ErrorType = {
        status: res.status,
        statusText: res.statusText,
        response: message
      }
      throw new Error(JSON.stringify(errorObject))
    }

    return res.json();
  }) as Promise<T>
};