const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const IncorrectError = require('../errors/incorrectError');
const { urlValidator } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => urlValidator.test(link),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    vaidate: isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new IncorrectError('передан неверный логин или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new IncorrectError('передан неверный логин или пароль'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
