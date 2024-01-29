const expres = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateId } = require('../validate/validate');

expres.get('/cards', getCards);
expres.post('/cards', validateCreateCard, createCard);
expres.delete('/cards/:id', validateId, deleteCard);
expres.put('/cards/:id/likes', validateId, likeCard);
expres.delete('/cards/:id/likes', validateId, dislikeCard);

module.exports = expres;
