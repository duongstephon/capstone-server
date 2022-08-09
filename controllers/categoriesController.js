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
        return;
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
        return;
      }

      res.status(200).json(data)
    })
    .catch((err) => res.status(400).send(`Error retrieving posts ${err}`))
}

exports.addPost = (req, res) => {
  knex('posts')
    .insert(req.body)
    .then(() => {
      const newPostURL = `/categories/${req.params.id}/posts`;
      res.status(201).location(newPostURL).send(newPostURL)
    })
}
