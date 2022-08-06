const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router
  .route('/')
  .get(postsController.index)

router
  .route('/:id')
  .get(postsController.getSinglePost)
  .delete(postsController.deletePost);

router
  .route('/:id/user')
  .get(postsController.getPostUser);

router
  .route('/:id/comments')
  .get(postsController.getPostComments)
  .post(postsController.addComment);

module.exports = router;
