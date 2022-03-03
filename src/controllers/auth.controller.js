const jwt = require('jsonwebtoken');

const secretKey = 'thisissecret';

module.exports = {
  createAccessToken(req, res) {
    const phone = req.phone;
    const message = req.message;

    const token = jwt.sign({ phone }, secretKey);
    res.json({ data: { phone: phone, token }, message });
  },

  validateToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'Missing authorization' });
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    try {
      const tokenData = jwt.verify(token, secretKey);

      const phone = tokenData.phone;
      req.phone = phone;
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      console.error(e);
    }
  },
};
