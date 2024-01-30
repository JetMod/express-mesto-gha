const { UNAUTHORIZED_ERROR_CODE } = require('../constants/constants');

class incorrectError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = incorrectError;
