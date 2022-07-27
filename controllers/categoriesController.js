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
