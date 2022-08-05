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

exports.getCommentUser = (req, res) => {
  knex('comments')
    .select('*')
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        res.sendStatus(404)
      }

      const currentComment = data[0]
      
      knex('users')
        .select('*')
        .where({ id: currentComment.user_id })
        .then((data) => {
          if (!data.length) {
            res.sendStatus(404)
          }
    
          res.status(200).json(data)
        })
        .catch((err) => res.status(400).send(`Error retrieving user with comment id ${req.params.id}: ${err}`))
    })
    .catch((err) => 
      res.status(400).send(`Error retrieving user with comment id ${req.params.id}: ${err}`))
}
