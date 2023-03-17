const { Logger } = require('aws-amplify');

// Set the log level
Logger.LOG_LEVEL = 'DEBUG';
// Create a logger instance with a specific name
const logger = new Logger('my-application-secretary');

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

module.exports.handleError = (e, message) => {
  logger.error(e);
  logger.error(message);
};