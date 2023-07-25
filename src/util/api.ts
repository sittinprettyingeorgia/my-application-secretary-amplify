import log from 'loglevel';
import axios, { Method } from 'axios';
log.setLevel('error');

export const handleResponse = (e: any) => {
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

export const handleAPIError = (res: any, e: any, response: string) => {
  log.error(response);
  log.error(e);

  res.status(200).json({
    success: false,
    response
  });
};

export const validateReq = (req: any) => {
  if (req.method !== 'GET') {
    throw new Error('Invalid request method');
  }
};

type Options = {
  path: string;
  method: Method;
  data?: any;
};

const init: Options = { path: 'user', method: 'get' };

export const getData = async (options = init) => {
  const { path, method, data: postData } = options;

  const fetchData = async () => {
    try {
      const response = await axios({
        method,
        url: `/api/${path}`,
        data: postData
      });
      return response.data;
    } catch (e: any) {
      log.error(e);
      return e;
    }
  };

  return fetchData();
};
