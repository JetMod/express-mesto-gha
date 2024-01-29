const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const urlValidator = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;

// для проверки формата ссылки
const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неправильный формат ссылки');
  }
  return value;
};

// проверяет параметр id в запросе
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

// проверяет параметр userId в запросе
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

// проверяет тело запроса для создания пользователя
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// проверяет тело запроса для обновления пользователя
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// проверяет тело запроса для обновления аватара
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

// проверяет тело запроса для создания карточки
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlValidator).required(),
  }),
});

module.exports = {
  validateURL,
  validateId,
  validateUserId,
  validateUser,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
};
