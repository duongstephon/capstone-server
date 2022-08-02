const knex = require('knex')(require('../knexfile').development)

exports.deleteComment = (req, res) => {
  knex('comments')
    .where ({ id: req.params.id })
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(400).send(`Error deleting post: ${err}`)
    })
}
