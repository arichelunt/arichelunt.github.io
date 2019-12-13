/**
* CHRONOBA.Faq
*
* @date 2019-08-22
*/

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Faq = function () {
  var slideUp = CHRONOBA.slideUp;
  var slideDown = CHRONOBA.slideDown;

  var _init = function _init() {
    accordionUI();
  };

  var accordionUI = function accordionUI() {
    var triggers = document.querySelectorAll('.js-accordion');
    var triggersLength = triggers.length;

    for (var i = 0; i < triggersLength; i++) {
      var trigger = triggers[i];
      trigger.addEventListener('click', function () {
        var panel = this.nextElementSibling;
        var icon = this.lastElementChild;
        if (window.getComputedStyle(panel).display === 'none') {
          slideDown(panel, 400);
          icon.classList.add('is-active');
        } else {
          slideUp(panel, 600);
          icon.classList.remove('is-active');
        }
      });
    }
  };

  return {
    init: _init
  };
}();

CHRONOBA.Faq.init();