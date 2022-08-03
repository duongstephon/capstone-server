const knex = require('knex')(require('../knexfile').development)

exports.index = (_req, res) => {
  knex('posts')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(err))
}

exports.getSinglePost = (req, res) => {
  knex('posts')
    .select("*")
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving post with id ${req.params.postId}: ${err}`))
}

exports.addPost = (req, res) => {
  knex('posts')
    .insert(req.body)
    .then(() => {
      console.log(req.body)
      const newPostURL = `/posts/${req.params.id}`;
      res.status(201).location(newPostURL).send(newPostURL)
    })
}

exports.deletePost = (req, res) => {
  knex('posts')
  .where ({ id: req.params.id })
  .del()
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err) => {
    res.status(400).send(`Error deleting post: ${err}`)
  })
}

exports.getPostComments = (req, res) => {
  knex('comments')
    .select("*")
    .where({ post_id: req.params.id })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving comments from post ${req.params.postId}: ${err}`))
}

exports.addComment = (req, res) => {
  knex('comments')
    .insert(req.body)
    .then(() => {
      console.log(req.body)
      const newPostURL = `/posts/${req.params.id}/comments`;
      res.status(201).location(newPostURL).send(newPostURL)
    })
}
