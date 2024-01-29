const Card = require('../models/card');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

// получение всех карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      next(new ServerError());
    });
};

// создание карточек
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неправильные данные'));
      } else {
        next(err);
      }
    });
};

// удаление карточек
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then(({ owner }) => {
      if (owner.toString() === req.user._id) {
        Card.findByIdAndDelete(req.params.id).then((card) => {
          res.status(200).send(card);
        });
      } else {
        throw new ForbiddenError('Нет прав для удаления этой карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невозможно удалить карточку'));
      } else {
        next(err);
      }
    });
};

// обновляет карточку, добавляя id пользователя в массив likes
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные введены неправильно'));
      } else {
        next(err);
      }
    });
};

// удаляет id пользователя из массива likes
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};
