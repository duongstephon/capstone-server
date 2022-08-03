const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router
  .route('/')
  .get(usersController.index);

router
  .route('/register')
  .post(usersController.userRegister);

router
  .route('/login')
  .post(usersController.userLogin);

router
  .route('/current')
  .get(usersController.getCurrentUser);

module.exports = router;
