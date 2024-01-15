import axios, { Axios, AxiosDefaults, AxiosHeaders, AxiosPromise, AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';
import { ACCESS_TOKEN, TOKEN_HEADER_NAME } from '../../../constants';
import { cookies } from "next/headers";

export const IPost = <T extends unknown>(url: string, data?: any, config?: AxiosRequestConfig<any>) => {
  const headers = {
    ...config?.headers,
  } as AxiosHeaders;
  headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string;

  return axios.post<T>(url, data, {
    ...config,
    headers,
  });
};

interface IGetProps {
  url: string;
  config?: AxiosRequestConfig<any>;
}

export const IGet = <T extends unknown>({ url, config }: IGetProps) => {
  const headers = {
    ...config?.headers,
  } as AxiosHeaders;
  headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string;

  return axios.get<T>(url, {
    ...config,
    headers,
  });
};
