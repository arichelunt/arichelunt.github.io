$(function () {
  const _init = function () {
    // modal();
    originTodo();
  };

  const originTodo = () => {
    const submit = document.querySelector('.toDo_submit');
    const todoList = document.querySelector('.toDo_list');

    const init = () => {
      clickEvent();
    };


    //クリックでストレージに追加
    const clickEvent = () => {
      submit.addEventListener('click', () => {
        let todoValue = document.getElementById('mydata_in').value;
        saveStorage(todoValue);
      }, false);
    };


    //ストレージ管理
    const saveStorage = (value) => {
      localStorage.setItem(value, JSON.stringify(value));
    };

    const getStorage = (value) => {
      let obj = localStorage.getItem(value);
      return JSON.parse(obj);
    };


    //ストレージ取得のループ
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      //list追加
      if (key === '') {
        continue;
      } else {
        todoList.insertAdjacentHTML("afterbegin", `<li class="toDo_key"><p>${getStorage(key)}</p><button class="toDo_delete"></button></li>`);
        //クリックでストレージから削除
        document.querySelector('.toDo_delete').addEventListener('click', () => {
          localStorage.removeItem(key);
        }, false);
      }
    }

    init();
  };

  // const modal = () => {
  //   const $win = $(window);
  //   const $openBtn = $('.js-openBtn');
  //   const $closeBtn = $('.js-closeBtn');

  //   const init = () => {
  //     $openBtn.on('click', modalOpen);
  //     $closeBtn.on('click', modalClose);
  //   };

  //   const modalOpen = () => {

  //     $('.container').addClass('is-modalOpen');

  //   };

  //   const modalClose = () => {
  //     $('.container').removeClass('is-modalOpen');
  //   };

  //   init();
  // };

  _init();
});