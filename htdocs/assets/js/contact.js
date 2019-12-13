/**
* CHRONOBA.Contact
*
* @date 2019-08-22
*/

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Contact = function () {
  var activateScrollLock = CHRONOBA.activateScrollLock;
  var deactivateScrollLock = CHRONOBA.deactivateScrollLock;
  var noScrollIPhone = CHRONOBA.noScrollIPhone;
  var returnScrollIPhone = CHRONOBA.returnScrollIPhone;
  var slideUp = CHRONOBA.slideUp;
  var slideDown = CHRONOBA.slideDown;

  var _init = function _init() {
    accordionContractStatus();
    modalUI();
  };

  var accordionContractStatus = function accordionContractStatus() {
    var panel = document.querySelector('.js-accordionPanel');
    var triggers = document.querySelectorAll('.js-accordionBtn');
    var contractDetail = document.querySelectorAll('.js-contractDetail');

    var checkContractDetail = function checkContractDetail() {
      for (var i = 0; i < contractDetail.length; i++) {
        contractDetail[i].checked = false;
      }
    };

    var handleClick = function handleClick(e) {
      if (e.target.getAttribute('id') === 'contracted' || e.target.getAttribute('id') === 'underApplication') {
        if (window.getComputedStyle(panel).display === 'none') {
          slideDown(panel, 200);
        }
      } else {
        checkContractDetail();
        slideUp(panel, 200);
      }
    };

    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', handleClick, false);
    }
  };

  var modalUI = function modalUI() {
    var modal = document.querySelector('.js-modal');
    var openbtn = document.querySelector('.js-openModal');
    if (!openbtn) {
      return;
    }
    var backdrop = document.querySelector('.js-backdropModal');
    var closebtn = document.querySelector('.js-closeModal');
    var lastFocusedElement = void 0;

    var onClickOpenButton = function onClickOpenButton() {
      modal.setAttribute('aria-hidden', 'false');
      document.body.setAttribute('aria-hidden', 'true');
      modal.tabIndex = 0;
      lastFocusedElement = document.activeElement;
      var focusableElement = modal.querySelector('button');
      focusableElement.focus();
      noScrollIPhone();
      activateScrollLock();

      modal.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) {
          e.preventDefault();
        }
        if (e.keyCode === 27) {
          onClickCloseButton();
        }
      });
    };

    var onClickCloseButton = function onClickCloseButton() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.setAttribute('aria-hidden', 'false');
      modal.tabIndex = -1;
      lastFocusedElement.focus();
      returnScrollIPhone();
      deactivateScrollLock();
    };

    openbtn.addEventListener('click', onClickOpenButton, false);
    backdrop.addEventListener('click', onClickCloseButton, false);
    closebtn.addEventListener('click', onClickCloseButton, false);
  };

  return {
    init: _init
  };
}();

CHRONOBA.Contact.init();