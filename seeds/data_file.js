const usersData = require('../seed_data/users');
const categoriesData = require('../seed_data/categories');
const postsData = require('../seed_data/posts');
const commentsData = require('../seed_data/comments');


exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert(usersData);
    })
    .then(() => {
      return knex('categories').del();
    })
    .then(() => {
      return knex('categories').insert(categoriesData);
    })
    .then(() => {
      return knex('posts').del();
    })
    .then(() => {
      return knex('posts').insert(postsData);
    })
    .then(() => {
      return knex('comments').del();
    })
    .then(() => {
      return knex('comments').insert(commentsData);
    });
};
