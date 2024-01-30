const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/mestodb');

const { login, createUser } = require('./controllers/users');
const { validateUser } = require('./validate/validate');
const auth = require('./middlewares/auth');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { SERVER_BAD_REQUEST_CODE } = require('./constants/constants');

// Авторизация
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);

app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || SERVER_BAD_REQUEST_CODE;
  const message = err.statusCode === SERVER_BAD_REQUEST_CODE ? 'На сервере произошла ошибка' : err.message;

  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер открыт на порту: ${PORT}`);
});
