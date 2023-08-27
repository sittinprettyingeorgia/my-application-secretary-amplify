import { AxiosError } from 'axios';
import log from 'loglevel';
log.setLevel('error');

export const handleResponse = (e: AxiosError) => {
  let message = '';
  let err;

  if (e.response) {
    message =
      'The request was made and the server responded with a status code that falls out of the range of 2xx';
    err = { message };
  } else if (e.request) {
    message = 'The request was made but no response was received';
    err = { message };
  } else {
    message =
      'Something happened in setting up the request that triggered an error';
    err = { message };
  }

  return err;
};

export const CONSTANTS = {
  POST: 'POST',
  X_API_KEY: 'x-api-key',
  API_KEY_CONST: 'API_KEY'
};

export const handleAPIError = (res: any, response: string) => {
  log.error(response);

  res.json({
    success: false,
    response
  });
};
