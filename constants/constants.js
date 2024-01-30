const OK = 200;
const SUCCESS = 201;
const NOT_FOUND_ERROR = 404;
const SERVER_BAD_REQUEST_CODE = 500;
const BAD_REQUEST_CODE = 400;
const CONFLICT_ERROR_CODE = 409;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR = 403;

const urlValidator = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

module.exports = {
  SUCCESS,
  OK,
  NOT_FOUND_ERROR,
  SERVER_BAD_REQUEST_CODE,
  urlValidator,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR_CODE,
};
