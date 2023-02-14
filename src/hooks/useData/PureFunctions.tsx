/* eslint-disable no-use-before-define */
import axios, { AxiosError, AxiosPromise } from 'axios';
import { ApiError, Method } from './types';

/*{AXIOS RESPONSE
    // `data` is the response that was provided by the server
    data: {},
  
    // `status` is the HTTP status code from the server response
    status: 200,
  
    // `statusText` is the HTTP status message from the server response
    // As of HTTP/2 status text is blank or unsupported.
    // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
    statusText: 'OK',
  
    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: {},
  
    // `config` is the config that was provided to `axios` for the request
    config: {},
  
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: {}
  }*/
export const getError = (e: AxiosError): ApiError => {
  let message = '';
  let err: ApiError;

  if (e.response) {
    message =
      'The request was made and the server responded with a status code that falls out of the range of 2xx';
    err = { message, ...e.response, json: e.toJSON.toString() };
  } else if (e.request) {
    message =
      'The request was made but no response was received `e.request` is an instance of XMLHttpRequest' +
      ' in the browser and an instance of http.ClientRequest in node.js';
    err = { message, ...e.request, json: e.toJSON.toString() };
  } else {
    message =
      'Something happened in setting up the request that triggered an error';
    err = { message, json: e.toJSON.toString() };
  }

  return err;
};

type Parameter<T> = T extends (arg: infer T) => any ? T : never;

export function retry<Fn extends (args?: any) => any>(
  limit: number,
  fn: Fn,
  args?: Parameter<Fn>
) {
  let tries = 0;
  // we should add a backoff timeout to these calls 1-2 seconds maybe
  //
  while (tries < limit) {
    try {
      const result = args ? fn(args) : fn();
      return result;
    } catch (ignore: unknown) {
      tries++;
    }
  }
}

export const getData = async (
  method: Method, //is there a generic axios Method interface we can use?
  url: string,
  abortControllerRef: React.MutableRefObject<AbortController>,
  retries = 0,
  data?: unknown
): Promise<AxiosPromise<unknown>> => {
  let tries = 0;
  const controller = abortControllerRef.current;
  const GET = {
    method,
    url,
    signal: controller.signal
  };
  const POST = { ...GET, data };
  // we should add a backoff timeout to these calls 1-2 seconds maybe
  let ignored: any;

  while (tries <= retries) {
    try {
      return axios(method === Method.POST ? POST : GET);
    } catch (ignore: any) {
      ignored = ignore;
      tries++;
    }
  }

  throw ignored;
};
