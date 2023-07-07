const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_URI } = require('./config');

const app = express();

const catchErrorsMiddleware = require('./middlewares/catchErrors');
const { requestLogger } = require('./middlewares/logger');

app.use(express.json());

mongoose.connect(DB_URI, {});

app.use(requestLogger); // логгер запросов

app.use('/', require('./routes/index'));

app.use(catchErrorsMiddleware);

app.listen(PORT, () => {});
