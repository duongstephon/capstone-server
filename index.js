require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const categoriesRoute = require('./routes/categoriesRoute')
app.use('/categories', categoriesRoute)

// const usersRoute = require('./routes/usersRoute')
// app.use('/users', usersRoute)

// const postsRoute = require('./routes/postsRoute')
// app.use('/posts', postsRoute)

// const commentsRoute = require('./routes/commentsRoute')
// app.use('/comments', commentsRoute)

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
