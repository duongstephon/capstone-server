const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// /categories
router
  .route('/')
  .get(categoriesController.index)
  .post(categoriesController.addCategory);

router
  .route('/:id')
  .get(categoriesController.getSingleCategory);

router
  .route('/:id/posts')
  .get(categoriesController.getCategoryPosts)
  .post(categoriesController.addPost);

// router
//   .route('/:id/posts/:postid')
//   .get(categoriesController.getSinglePost);
//   .delete(categoriesController.deletePost);

// router
//   .route('/:id/posts/:postid/comments')
//   .get(categoriesController.getPostComments);

module.exports = router;

