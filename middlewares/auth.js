/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const IncorrectError = require('../errors/incorrectError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  console.log(req.header('Authorization'));
  // eslint-disable-next-line no-shadow
  const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
  let payload;

  try {
    const token = req.header('Authorization').split(' ')[1];
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new IncorrectError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
