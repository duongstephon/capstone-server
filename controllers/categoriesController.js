const knex = require('knex')(require('../knexfile').development)

exports.index = (_req, res) => {
  knex('categories')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(err))
}

exports.getSingleCategory = (req, res) => {
  knex('categories')
    .select('*')
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data[0])
    })
    .catch((err) => 
      res.status(400).send(`Error retrieving category with id ${req.params.id}: ${err}`))
}

exports.addCategory = (req, res) => {
  knex('categories')
    .insert(req.body)
    .then((data) => {
      const newCategoryURL = `/categories/${data[0]}`;
      res.status(201).location(newCategoryURL).send(newCategoryURL)
    })
}

exports.getCategoryPosts = (req, res) => {
  knex('posts')
    .select("*")
    .where({ category_id: req.params.id })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving posts ${err}`))
}

exports.addPost = (req, res) => {
  knex('posts')
    .insert(req.body)
    .then((data) => {
      console.log(req.body)
      const newPostURL = `/categories/${req.params.id}/posts/${data[0]}`;
      res.status(201).location(newPostURL).send(newPostURL)
    })
}

exports.getSinglePost = (req, res) => {
  knex('posts')
    .select("*")
    .where({ id: req.params.postid })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving post with id ${req.params.postId}: ${err}`))
}

// exports.deletePost = (req, res) => {

// }

exports.getPostComments = (req, res) => {
  knex('comments')
    .select("*")
    .where({ post_id: req.params.postid })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving comments from post ${req.params.postId}: ${err}`))
}
