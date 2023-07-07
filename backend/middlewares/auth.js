const jwt = require('jsonwebtoken');

const AuthError = require('../errors/authError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходима авторизация!'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-puper-secret-key');
  } catch (err) {
    return next(new AuthError('Необходима авторизация!'));
  }

  req.user = payload;

  return next();
};
