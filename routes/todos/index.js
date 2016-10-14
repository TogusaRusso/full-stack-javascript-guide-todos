var express = require('express')
var router = express.Router()
var Todo = require('../../models/todos')
router.get('/', function (req, res, next) {
  Todo.findAsync()
  .then(function (todos) {
    res.render('todos', {title: 'Todos', todos: todos})
  })
  .catch(next)
  .error(console.error)
})
/*
var todos   = require("../models/todos");
router.get('/', function(req, res)  {
    res.render('todos', {title: "Todos", todos: todos});
});
*/
module.exports = router
