$(function () {
  var _init = function _init() {
    originTodo();
  };

  var originTodo = function originTodo() {
    var submit = document.querySelector('.toDo_submit');
    var todoList = document.querySelector('.toDo_list');

    var init = function init() {
      clickEvent();
    };

    var clickEvent = function clickEvent() {
      submit.addEventListener('click', function () {
        var todoValue = document.getElementById('mydata_in').value;
        saveStorage(todoValue);
      }, false);
    };

    var saveStorage = function saveStorage(value) {
      localStorage.setItem(value, JSON.stringify(value));
    };

    var getStorage = function getStorage(value) {
      var obj = localStorage.getItem(value);
      return JSON.parse(obj);
    };


    var _loop = function _loop(i) {
      var key = localStorage.key(i);
      if (key === '') {
        return 'continue';
      } else {
        todoList.insertAdjacentHTML("afterbegin", '<li class="toDo_key"><p>' + getStorage(key) + '</p><button class="toDo_delete"></button></li>');
        document.querySelector('.toDo_delete').addEventListener('click', function () {
          localStorage.removeItem(key);
        }, false);
      }
    };

    for (var i = 0; i < localStorage.length; i++) {
      var _ret = _loop(i);

      if (_ret === 'continue') continue;
    }

    init();
  };








  _init();
});