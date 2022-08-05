const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require("knex")(require('../knexfile').development)

exports.index = (_req, res) => {
  knex("users")
  .select("*")
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => res.status(400).send(`No users found ${err}`))
}

exports.userRegister = (req, res) => {
  const { first_name, last_name, username, email, password } = req.body

  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).send('Please enter required fields');
  }

  const hashPassword = bcrypt.hashSync(password);

  knex("users")
    .insert({
      ...req.body,
      password: hashPassword
    })
    .then(() => {
      res.status(201).send('Registered successfully');
    })
    .catch((err) => {
      res.status(400).json({ message: 'Failed registration', error: err.sqlMessage });
    })
}

exports.userLogin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("Please enter all required fields");
  }

  knex('users')
    .where({ email: email })
    .then((user) => {
      if (!user.length) {
        return res.status(401).send("Email and password are invalid");
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);

      if (!isPasswordCorrect) {
        return res.status(401).send("Email and password are invalid");
      }

      const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h'
        }
      )

      res.status(200).json({ token: token });
    })
    .catch(() => {
      return res.status(401).send("Email and password are invalid");
    })
}

exports.getCurrentUser = (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authToken = req.headers.authorization.split(' ')[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).send('Invalid auth token');
    } else {
      knex('users')
        .where({ email: payload.email })
        .then((user) => {
          res.status(200).send(user[0])
        })
        .catch(() => {
          res.status(500).send('Could not fetch data')
        })
    }
  })
}

