const routes = require('express').Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

routes.post(
  '/auth/register',
  userController.validatePhone,
  userController.validatePassword,
  userController.register,
  authController.createAccessToken
);
routes.post(
  '/auth/login',
  userController.validatePhone,
  userController.validatePassword,
  userController.login,
  authController.createAccessToken
);
routes.post(
  '/auth/forgot_password',
  userController.validatePhone,
  userController.changePassword,
  authController.createAccessToken
);

routes.post('/auth/check', authController.validateToken, userController.check);

module.exports = routes;
