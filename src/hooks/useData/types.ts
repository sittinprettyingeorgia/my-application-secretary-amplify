import { AxiosResponseHeaders } from 'axios';

export enum Method {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT'
}

type ApiErrorType = {
  message: string;
  data: unknown;
  status: number;
  headers: AxiosResponseHeaders;
  json: string;
  statusText: string;
};

export type ApiError = Partial<ApiErrorType>;
