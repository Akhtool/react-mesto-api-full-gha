require('dotenv').config();

const { devSecret } = require('./utils/constants');

const {
  NODE_ENV = 'dev',
  JWT_SECRET,
  PORT = 3000,
  DB_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

const secret = NODE_ENV === 'production' ? JWT_SECRET : devSecret;

module.exports = {
  PORT,
  DB_URI,
  secret,
};
