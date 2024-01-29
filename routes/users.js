const expres = require('express').Router();

const {
  getUsers,
  getUserMe,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateUser,
  validateUpdateAvatar,
  validateUserId,
} = require('../validate/validate');

expres.get('/users', getUsers);
expres.get('/users/me', getCurrentUser);
expres.get('/users/:userId', validateUserId, getUserMe);
expres.patch('/users/me', validateUpdateUser, updateUser);
expres.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = expres;
