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

module.exports = router;

