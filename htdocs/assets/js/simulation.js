/**
* CHRONOBA.Simulation
*
* @date 2019-08-22
*/

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Simulation = function () {
  var slideDown = CHRONOBA.slideDown;
  var modalUI = CHRONOBA.modalUI;
  var mqs = CHRONOBA.mqs;
  var $slider = $('.js-slickSimulation');

  var _init = function _init() {
    setSimulate();
    modalUI();

    var reloadBreakPoint = function reloadBreakPoint() {
      location.reload();
    };
    var checkBreakPoint = function checkBreakPoint(mqs) {
      if (mqs.matches) {
        $('.js-changeTxt').html('その他<small>クリーニング・防災・仮設・設計管理費等</small>');
      }
    };
    mqs.addListener(reloadBreakPoint);
    checkBreakPoint(mqs);
  };

  var simulationCarouselUI = function simulationCarouselUI() {
    $slider.slick({
      infinite: false,
      centerMode: true,
      centerPadding: '8vw',
      slidesToShow: 1,
      arrows: false
    });
  };

  var setSimulate = function setSimulate() {
    var $overlay = $('#js-simulationOverlay');
    var $inputVal = $('.js-inputVal');
    var $inputField = $('#js-inputField');
    var $selectBox = $('.js-selectBoxWrap');
    var $selectItem = $('.js-selectItem');
    var $tableItem = $('.js-resultTableItem');
    var inputVal = 0;

    $inputField.on('input', function () {
      inputVal = parseInt($(this).val());
      if (50 <= inputVal && inputVal <= 100) {
        if (mqs.matches) {
          if (!$slider.hasClass('slick-initialized')) {
            simulationCarouselUI();
          }
        }
        $overlay.attr('aria-disabled', false);
        if ($selectBox.is(':hidden')) {
          slideDown($selectBox[0], 600);
          slideDown($selectBox[1], 600);
          slideDown($selectBox[2], 600);
        }
        $inputVal.html(inputVal);
        _addResultValue();
      } else {
        $overlay.attr('aria-disabled', true);
        $inputVal.html(0);
        _addResetValue();
      }
    });

    $selectItem.on('click', function (e) {
      e.preventDefault();
      $(this).closest('.js-selectBoxWrap').find('.js-selectBox-check').attr('aria-checked', false);
      $(this).find('.js-selectBox-check').attr('aria-checked', true);
      $(this).addClass('is-select');
      $(this).closest('.js-selectBoxWrap').find('.js-selectItem').removeClass('is-select');
      $(this).addClass('is-select');
      _addResultValue();
    });

    var _addResetValue = function _addResetValue() {
      var resetVal = 0;
      if (mqs.matches) {
        $('.js-resultTableItemSp01').find('.js-originalVal').html(resetVal);
        $('.js-resultTableItemSp02').find('.js-defaultVal').html(resetVal);
        $('.js-originalValTotal').html(resetVal);
        $('.js-defaultValTotal').html(resetVal);
        $('.js-ajustValTotal').html(resetVal);
      } else {
        $('.js-resultStep').find('.val').html(resetVal);
        $('.js-resultTotal').find('.val').html(resetVal);
        $('.js-resultTotalAjust').find('.val').html(resetVal);
      }
    };

    var _addResultValue = function _addResultValue() {
      var originalValArry = [];
      var defaultValArry = [];
      var ajustVal = 3.3;
      var commaOriginalVal = void 0,
          commaDefaultVal = void 0,
          totalOriginalVal = void 0,
          totalDefaultVal = void 0,
          totalAjustVal = void 0;

      var separate = function separate(num) {
        num = String(num);
        var len = num.length;
        if (len > 3) {
          return separate(num.substring(0, len - 3)) + ',' + num.substring(len - 3);
        } else {
          return num;
        }
      };

      var sumArry = function sumArry(arry) {
        var sum = 0;
        arry.forEach(function (element) {
          sum += element;
        });
        return sum;
      };

      $selectBox.each(function (i) {
        originalValArry[i] = parseInt($selectBox.eq(i).find('.is-select').attr('data-val') * inputVal);
        defaultValArry[i] = parseInt($selectBox.eq(i).find('.is-select').attr('data-val'));

        commaOriginalVal = separate(originalValArry[i]);
        commaDefaultVal = separate(defaultValArry[i]);

        if (mqs.matches) {
          $('.js-resultTableItemSp01').eq(i).find('.js-originalVal').html(commaOriginalVal);
          $('.js-resultTableItemSp02').eq(i).find('.js-defaultVal').html(commaDefaultVal);
        } else {
          $tableItem.eq(0).find('.js-resultStep').eq(i).find('.val').html(commaOriginalVal);
          $tableItem.eq(1).find('.js-resultStep').eq(i).find('.val').html(commaDefaultVal);
        }
      });

      totalOriginalVal = separate(sumArry(originalValArry));
      totalDefaultVal = separate(sumArry(defaultValArry));
      totalAjustVal = separate(sumArry(defaultValArry) * ajustVal);

      if (mqs.matches) {
        $('.js-originalValTotal').html(totalOriginalVal);
        $('.js-defaultValTotal').html(totalDefaultVal);
        $('.js-ajustValTotal').html(totalAjustVal);
      } else {
        $tableItem.eq(0).find('.js-resultTotal .val').html(totalOriginalVal);
        $tableItem.eq(1).find('.js-resultTotal .val').html(totalDefaultVal);
        $tableItem.eq(1).find('.js-resultTotalAjust .val').html(totalAjustVal);
      }
    };
  };

  return {
    init: _init
  };
}();

CHRONOBA.Simulation.init();