const jwt = require('jsonwebtoken');

const verifyJWTMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader && tokenHeader.split(' ')[1];

  if (token === null) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).send(err);
    }

    req.user = data;
    next();
  });
};

module.exports = verifyJWTMiddleware;
