const { SERVER_BAD_REQUEST_CODE } = require('../constants/constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_BAD_REQUEST_CODE;
  }
}

module.exports = ServerError;
