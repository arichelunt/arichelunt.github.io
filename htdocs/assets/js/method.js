/**
* CHRONOBA.Method
*
* @date 2019-08-22
*/

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Method = function () {
  var setCarouselMethod = CHRONOBA.setCarouselMethod;

  var _init = function _init() {
    setCarouselMethod();
  };

  return {
    init: _init
  };
}();

CHRONOBA.Method.init();