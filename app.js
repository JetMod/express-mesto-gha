const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions1 = {
  origin: '*',
};

app.use(cors(corsOptions1));

const { login, createUser } = require('./controllers/users');
const { validateUser } = require('./validate/validate');
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const errorMiddleware = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Авторизация
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);

app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddleware);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/mestodb', {
    useNewUrlParser: true,
  }).catch((err) => console.log(err));
  console.log('Connected to db');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
