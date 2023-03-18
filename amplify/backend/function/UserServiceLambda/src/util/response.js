const log = require('loglevel');

log.setLevel('error');

module.exports.handleResponse = e => {
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

module.exports.CONSTANTS = {
  POST: 'POST',
  X_API_KEY: 'x-api-key',
  API_KEY_CONST: 'API_KEY'
};

const handleError = (e, message) => {
  log.error(e);
  log.error(message);
};
module.exports.handleError = handleError;

module.exports.handleAPIError = (res, e, response) => {
  handleError(e, response);

  res.json({
    success: false,
    response
  });
};
