import log from 'loglevel';
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

export const handleAPIError = (res: any, response: string) => {
  log.error(response);

  res.json({
    success: false,
    response
  });
};

export const validateReq = (req: any) => {
  if (req.method !== 'GET') {
    throw new Error('Invalid request method');
  }
};
