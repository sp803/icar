const User = require('../models/user.models');

module.exports = {
  async validatePhone(req, res, next) {
    const { phone } = req.body;

    if (!phone || phone.trim().length < 4) {
      return res
        .status(400)
        .json({ message: 'Phone must have at least 4 characters' });
    }

    next();
  },

  async validatePassword(req, res, next) {
    const { password } = req.body;

    if (!password || password.trim().length < 4) {
      return res
        .status(400)
        .json({ message: 'Password must have at least 4 characters' });
    }

    next();
  },

  async register(req, res, next) {
    const { phone, password } = req.body;

    const phoneIsExists = await User.findByPhone(phone);
    if (phoneIsExists) {
      return res.status(409).json({ message: 'Phone is already exists' });
    }

    await User.create({ phone, password });
    req.phone = phone;
    req.message = 'Register success';
    next();
  },

  async login(req, res, next) {
    const { phone, password } = req.body;

    const user = await User.findByPhone(phone);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    req.phone = phone;
    req.message = 'Login success';
    next();
  },

  async changePassword(req, res, next) {
    const { phone, newPassword } = req.body;
    if (!newPassword || newPassword.trim().length < 4) {
      return res
        .status(400)
        .json({ message: 'New password must contains at least 4 characters' });
    }

    const user = await User.findByPhone(phone);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();
    req.phone = phone;
    req.message = 'Password changed';
    next();
  },

  async check(req, res) {
    const phone = req.phone;
    const user = await User.findByPhone(phone);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user, message: "Here's your user" });
  },
};
