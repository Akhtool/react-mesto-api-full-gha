const {
  PORT = 5001,
  DB_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

module.exports = {
  PORT,
  DB_URI,
};
