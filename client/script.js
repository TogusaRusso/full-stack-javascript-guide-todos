var $ = require('jquery')
var todoTemplate = require('../views/partials/todo.hbs')

$(function () {
  $(':button').on('click', addTodo)
  $(':text').on('keypress', function (e) {
    var key = e.keyCode
    if (key === 13 || key === 169) {
      addTodo()
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  })
  $('ul').on('change', 'li :checkbox', function () {
    var $this = $(this)
    var $input = $this[0]
    var $li = $this.parent()
    var id = $li.attr('id')
    var checked = $input.checked
    var data = {done: checked}
    updateTodo(id, data, function (d) {
      $li.toggleClass('checked')
    })
  })
  $('ul').on('keypress', 'li span', function (e) {
    var $this = $(this)
    var $span = $this[0]
    var $li = $this.parent()
    var id = $li.attr('id')
    var key = e.keyCode
    var target = e.target
    var text = $span.innerHTML
    var data = {text: text}
    $this.addClass('editing')
    if (key === 27) { // escape key
      $this.removeClass('editing')
      document.execCommand('undo')
      target.blur()
    }
    if (key === 13) { // enter key
      updateTodo(id, data, function (d) {
        $this.removeClass('editing')
        target.blur()
      })
      e.preventDefault()
    }
  })
  $('ul').on('click', 'li a', function () {
    var $this = $(this)
    var $li = $this.parent()
    var id = $li.attr('id')
    deleteTodo(id, function (e) {
      deleteTodoLi($li)
    })
  })
})

var addTodo = function () {
  var text = $('#add-todo-text').val()
  $.ajax({
    url: 'api/todos',
    type: 'POST',
    data: {text: text},
    dataType: 'json',
    success: function (data) {
      var todo = data.todo
      var newLiHtml = todoTemplate(todo)
      $('ul').append(newLiHtml)
      $('#add-todo-text').val('')
    }
  })
}

var updateTodo = function (id, data, cb) {
  $.ajax({
    url: `api/todos/${id}`,
    type: 'PUT',
    data: data,
    dataType: 'json',
    success: function (data) {
      cb()
    }
  })
}

var deleteTodo = function (id, cb) {
  $.ajax({
    url: `api/todos/${id}`,
    type: 'DELETE',
    data: {
      Id: id
    },
    dataType: 'json',
    success: function (data) {
      cb()
    }

  })
}

var deleteTodoLi = function ($li) {
  $li.remove()
}
/*
window.onload = function() {
  var checkboxes = document.getElementsByTagName('input');
  for (var i = 0; i < checkboxes.length; ++i) {
    checkboxes[i].addEventListener('click', clickHandler);
  }
};

function clickHandler() {
  if(this.checked) {
    this.parentNode.className = 'checked';
  } else {
    this.parentNode.className = '';
  }
}
*/
