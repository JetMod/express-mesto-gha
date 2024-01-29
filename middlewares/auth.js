const jwt = require('jsonwebtoken');
const IncorrectError = require('../errors/incorrectError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const payload = jwt.verify(token, 'secret-key');
    req.user = payload;
    return next();
  } catch (err) {
    throw new IncorrectError('Необходима авторизация');
  }
};

module.exports = auth;
