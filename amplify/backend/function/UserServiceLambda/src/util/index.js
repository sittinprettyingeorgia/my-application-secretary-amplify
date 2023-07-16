const dynamo = require("./dynamo");
const s3 = require("./s3");
const apiGateway = require("./api-gateway");
const response = require("./response");
const validator = require("./validator");
const appSync = require("./appsync");

module.exports = {
  dynamo,
  s3,
  apiGateway,
  handleAPIError: response.handleAPIError,
  handleResponse: response.handleResponse,
  CONSTANTS: response.CONSTANTS,
  validateParams: validator.validateParams,
  isMapWithStringKeyAndNumberValue: validator.isMapWithStringKeyAndNumberValue,
  isValidJobPreferences: validator.isValidJobPreferences,
  appSync
};