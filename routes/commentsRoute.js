const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router
  .route('/:id')
  .delete(commentsController.deleteComment);

module.exports = router;
