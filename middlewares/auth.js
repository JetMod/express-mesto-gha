const jwt = require('jsonwebtoken');
const IncorrectError = require('../errors/incorrectError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new IncorrectError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
