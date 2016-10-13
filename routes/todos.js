var express = require('express')
var router = express.Router()
var Todo = require('../models/todos')
router.get('/', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) return console.error(err)
    res.render('todos', {title: 'Todos', todos: todos})
  })
})
/*
var todos   = require("../models/todos");
router.get('/', function(req, res)  {
    res.render('todos', {title: "Todos", todos: todos});
});
*/
module.exports = router
