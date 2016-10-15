var $ = require('jquery')

$(function () {
  $(':button').on('click', addTodo)
  $('input').on('click', function () {
    $(this).parent().toggleClass('checked')
  })
  $(':text').on('keypress', function (e) {
    var key = e.keyCode
    if (key === 13 || key === 169) {
      addTodo()
      e.preventDefault()
      e.stopPropagation()
      return false
    }
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
      var newLiHtml = `<li><input type='checkbox'><span>${todo.text}</span></li>`
      $('ul').append(newLiHtml)
      $('#add-todo-text').val('')
    }
  })
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
