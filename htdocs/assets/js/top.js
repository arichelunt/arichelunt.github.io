/**
* CHRONOBA.Top
*
* @date 2019-08-22
*/

(function ($) {
  var CHRONOBA = window.CHRONOBA || {};

  CHRONOBA.Top = function () {
    var mqm = CHRONOBA.mqm;
    var mqs = CHRONOBA.mqs;
    var scrollAnimation = CHRONOBA.scrollAnimation;
    var setCarouselMethod = CHRONOBA.setCarouselMethod;
    var activateScrollLock = CHRONOBA.activateScrollLock;
    var deactivateScrollLock = CHRONOBA.deactivateScrollLock;
    var noScrollIPhone = CHRONOBA.noScrollIPhone;
    var returnScrollIPhone = CHRONOBA.returnScrollIPhone;
    var getWindowWidth = CHRONOBA.getWindowWidth;
    var $hero = $('.hero');

    var _init = function _init() {
      openingAnimation();
      buildCaseStudy();
      setCarouselMethod();
      objectFitImages();
      resizeHero();
      scrollAnimation();
    };

    var openingAnimation = function openingAnimation() {

      var $header = $('.l-header.-top');
      var $container = $('.hero__container');
      var $inner = $('.hero__inner');
      var $img = $('.hero__img');
      var $bg = $('.hero__bg');
      var $sidebtn = $('.l-sidebtn');
      var $htxt = $('.hero__htxt');
      var $ftxt = $('.hero__ftxt');
      var $quo = $('.hero__quo');
      var $btn = $('.hero__btn');
      var $drawerBtn = $('.p-header__button');
      var value = $header.height();

      var windowWidth = getWindowWidth();
      var mq = 767;
      var sideBtnPos = void 0;
      if (windowWidth > mq) {
        sideBtnPos = '-236px';
      } else {
        sideBtnPos = '-68vw';
      }

      function setup() {
        var tl = new TimelineMax();

        tl.set([$header, $hero, $htxt, $ftxt, $btn, $bg, $sidebtn], { autoAlpha: 0 }).set($header, { y: -value });

        $drawerBtn.attr('aria-disabled', true);

        return tl;
      }

      function trimImg() {
        var tl = new TimelineMax();

        tl.add('start').to($hero, 1, { autoAlpha: 1 }, 'start+=0').to($hero, 1, { css: { marginTop: value, autoRound: false }, ease: Power4.easeOut }, 'start+=0.5').to($container, 1, { css: { maxWidth: '1400px', height: 'auto', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');

        if (mqm.matches) {
          tl.to($inner, 1, { css: { width: '100%', height: 'auto', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');
        } else {
          tl.to($inner, 1, { css: { width: '93%', height: 'auto', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');
        }

        if (mqs.matches) {
          tl.to($img, 1, { css: { width: '100%', height: '56.5vw', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');
        } else if (mqm.matches) {
          tl.to($img, 1, { css: { width: '100%', height: '500px', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');
        } else {
          tl.to($img, 1, { css: { width: '79%', height: '598px', autoRound: false }, ease: Power4.easeOut }, 'start+=0.5');
        }

        tl.to($header, 1.5, { autoAlpha: 1 }, 'start+=0.5').to($header, 1.5, { y: 0, ease: Power4.easeOut }, 'start+=0.5');

        return tl;
      }

      function displayElem() {
        var tl = new TimelineMax();

        var timeArray = new Array();
        for (var i = 0; i < 45; i++) {
          timeArray[i] = i * 0.025;
        }var duration = 0.2;

        tl.add('show');

        if (windowWidth > mq) {
          tl.to($('.hero__obj.-left'), 1.4, { clip: 'rect(108px 11px 261px 0px)', ease: Power2.easeOut }, 'show+=0.4').to($('.hero__obj.-top'), 1.4, { clip: 'rect(0px 404px 14px 0px)', ease: Power2.easeOut }, 'show+=0.4').to($('.hero__obj.-middle'), 1.4, { clip: 'rect(0px 404px 4px 0px)', ease: Power2.easeOut }, 'show+=0.4').to($('.hero__obj.-bottom'), 1.4, { clip: 'rect(0px 404px 14px 0px)', ease: Power2.easeOut }, 'show+=0.4');
        } else {
          tl.to($('.hero__obj.-top'), 1.4, { clip: 'rect(0px 59.4vw 2.4vw 0px)', ease: Power2.easeOut }, 'show+=0.4').to($('.hero__obj.-middle'), 1.4, { clip: 'rect(0px 59.4vw 0.8vw 0px)', ease: Power2.easeOut }, 'show+=0.4').to($('.hero__obj.-bottom'), 1.4, { clip: 'rect(0px 59.4vw 2.67vw 0px)', ease: Power2.easeOut }, 'show+=0.4');
        }

        tl.to($htxt.eq(3), duration, { autoAlpha: 1 }, 'show+=' + timeArray[1]).to($htxt.eq(11), duration, { autoAlpha: 1 }, 'show+=' + timeArray[2]).to($ftxt.eq(9), duration, { autoAlpha: 1 }, 'show+=' + timeArray[3]).to($ftxt.eq(22), duration, { autoAlpha: 1 }, 'show+=' + timeArray[4]).to($htxt.eq(0), duration, { autoAlpha: 1 }, 'show+=' + timeArray[5]).to($ftxt.eq(14), duration, { autoAlpha: 1 }, 'show+=' + timeArray[6]).to($htxt.eq(7), duration, { autoAlpha: 1 }, 'show+=' + timeArray[7]).to($ftxt.eq(3), duration, { autoAlpha: 1 }, 'show+=' + timeArray[8]).to($htxt.eq(16), duration, { autoAlpha: 1 }, 'show+=' + timeArray[9]).to($ftxt.eq(0), duration, { autoAlpha: 1 }, 'show+=' + timeArray[10]).to($ftxt.eq(20), duration, { autoAlpha: 1 }, 'show+=' + timeArray[11]).to($ftxt.eq(17), duration, { autoAlpha: 1 }, 'show+=' + timeArray[12]).to($htxt.eq(4), duration, { autoAlpha: 1 }, 'show+=' + timeArray[13]).to($htxt.eq(14), duration, { autoAlpha: 1 }, 'show+=' + timeArray[14]).to($ftxt.eq(7), duration, { autoAlpha: 1 }, 'show+=' + timeArray[15]).to($ftxt.eq(19), duration, { autoAlpha: 1 }, 'show+=' + timeArray[16]).to($htxt.eq(9), duration, { autoAlpha: 1 }, 'show+=' + timeArray[17]).to($htxt.eq(10), duration, { autoAlpha: 1 }, 'show+=' + timeArray[18]).to($htxt.eq(13), duration, { autoAlpha: 1 }, 'show+=' + timeArray[19]).to($ftxt.eq(4), duration, { autoAlpha: 1 }, 'show+=' + timeArray[20]).to($quo.eq(0), duration, { autoAlpha: 1 }, 'show+=' + timeArray[21]).to($ftxt.eq(15), duration, { autoAlpha: 1 }, 'show+=' + timeArray[22]).to($ftxt.eq(12), duration, { autoAlpha: 1 }, 'show+=' + timeArray[23]).to($htxt.eq(2), duration, { autoAlpha: 1 }, 'show+=' + timeArray[24]).to($htxt.eq(15), duration, { autoAlpha: 1 }, 'show+=' + timeArray[25]).to($htxt.eq(6), duration, { autoAlpha: 1 }, 'show+=' + timeArray[26]).to($ftxt.eq(21), duration, { autoAlpha: 1 }, 'show+=' + timeArray[27]).to($htxt.eq(8), duration, { autoAlpha: 1 }, 'show+=' + timeArray[28]).to($htxt.eq(12), duration, { autoAlpha: 1 }, 'show+=' + timeArray[29]).to($ftxt.eq(1), duration, { autoAlpha: 1 }, 'show+=' + timeArray[30]).to($ftxt.eq(6), duration, { autoAlpha: 1 }, 'show+=' + timeArray[31]).to($ftxt.eq(8), duration, { autoAlpha: 1 }, 'show+=' + timeArray[32]).to($ftxt.eq(11), duration, { autoAlpha: 1 }, 'show+=' + timeArray[33]).to($ftxt.eq(16), duration, { autoAlpha: 1 }, 'show+=' + timeArray[34]).to($quo.eq(1), duration, { autoAlpha: 1 }, 'show+=' + timeArray[35]).to($htxt.eq(1), duration, { autoAlpha: 1 }, 'show+=' + timeArray[36]).to($ftxt.eq(10), duration, { autoAlpha: 1 }, 'show+=' + timeArray[37]).to($htxt.eq(5), duration, { autoAlpha: 1 }, 'show+=' + timeArray[38]).to($ftxt.eq(2), duration, { autoAlpha: 1 }, 'show+=' + timeArray[39]).to($ftxt.eq(5), duration, { autoAlpha: 1 }, 'show+=' + timeArray[40]).to($ftxt.eq(13), duration, { autoAlpha: 1 }, 'show+=' + timeArray[41]).to($ftxt.eq(18), duration, { autoAlpha: 1 }, 'show+=' + timeArray[42]).to($bg, duration, { autoAlpha: 1 }, 'show+=' + timeArray[43]).to($btn, duration, { autoAlpha: 1 }, 'show+=' + timeArray[44]);

        return tl;
      }

      function heroHeight() {
        var tl = new TimelineMax();

        tl.add('hero').to($hero, 0.5, { css: { height: 'auto', autoRound: false }, ease: Power4.easeIn }, 'hero+=0');

        return tl;
      }

      noScrollIPhone();
      activateScrollLock();

      var master = new TimelineMax({
        onComplete: function onComplete() {
          returnScrollIPhone();
          deactivateScrollLock();
          $('html').addClass('is-opening');
          TweenMax.to($sidebtn, .6, { css: { right: sideBtnPos, autoRound: false, autoAlpha: 1 }, ease: Power4.easeOut });
          $drawerBtn.attr('aria-disabled', false);
        }
      });

      master.add(setup()).add(trimImg()).add(displayElem(), 'displayElem-=1.2').add(heroHeight());
    };

    var resizeHero = function resizeHero() {
      function handle() {
        if (mqs.matches) {
          $hero.removeClass('is-middle');
          $hero.removeClass('is-large');
          $hero.addClass('is-small');
        } else if (mqm.matches) {
          $hero.removeClass('is-small');
          $hero.removeClass('is-large');
          $hero.addClass('is-middle');
        } else {
          $hero.removeClass('is-middle');
          $hero.removeClass('is-small');
          $hero.addClass('is-large');
        }
      }

      mqs.addListener(handle);
      mqm.addListener(handle);
    };

    var buildCaseStudy = function buildCaseStudy() {
      var parentLarge = document.querySelector('.js-buildParentLarge');
      var parentMiddle = document.querySelector('.js-buildParentMiddle');
      var child = document.querySelector('.js-buildChild');

      function handle() {
        if (mqm.matches) {

          if ('.js-buildParentLarge:not(:has(.js-buildChild))') {
            parentLarge.removeChild(child);
            parentMiddle.insertBefore(child, parentMiddle.firstChild);
          } else {
            return;
          }
        } else {

          if ('.js-buildParentLarge:not(:has(.js-buildChild))') {
            parentLarge.insertBefore(child, parentLarge.firstChild);
          } else {
            return;
          }
        }
      }

      handle();
      mqm.addListener(handle);
    };

    return {
      init: _init
    };
  }();

  CHRONOBA.Top.init();
})(jQuery);