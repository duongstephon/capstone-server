const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router
  .route('/:id')
  .delete(commentsController.deleteComment);

router
  .route('/:id/user')
  .get(commentsController.getCommentUser);

module.exports = router;
