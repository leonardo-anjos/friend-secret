const restify = require('express-restify-mongoose');
const Person = require('./../models/person');

module.exports = (router) => {
  restify.serve(router, Person);
};
