var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * jQueryオブジェクトの拡張
 *
 * @date 2019-05-15
 */
(function ($) {
  /**
   * userAgent判定フラグ
   *
   * @date 2019-05-15
   */
  var ua = navigator.userAgent.toLowerCase();
  $.ua = {
    isWindows: /windows/.test(ua),
    isMac: /macintosh/.test(ua),
    isIE: /msie (\d+)|trident/.test(ua),
    isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
    isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
    isFirefox: /firefox/.test(ua),
    isWebKit: /applewebkit/.test(ua),
    isChrome: /chrome/.test(ua) && !/edge/.test(ua) || /crios/.test(ua),
    isSafari: /safari/.test(ua) && !/chrome/.test(ua) && !/crios/.test(ua) && !/android/.test(ua),
    isIOS: /i(phone|pod|pad)/.test(ua),
    isIOSChrome: /crios/.test(ua),
    isIPhone: /i(phone|pod)/.test(ua),
    isIPad: /ipad/.test(ua),
    isAndroid: /android/.test(ua),
    isAndroidMobile: /android(.+)?mobile/.test(ua),
    isTouchDevice: 'ontouchstart' in window,
    isMobile: /i(phone|pod)/.test(ua) || /android(.+)?mobile/.test(ua),
    isTablet: /ipad/.test(ua) || /android/.test(ua) && !/mobile/.test(ua)
  };

  /**
   * ロールオーバー
   *
   * @date 2012-10-01
   *
   * @example $('.rollover').rollover();
   * @example $('.rollover').rollover({ over: '-ov' });
   * @example $('.rollover').rollover({ current: '_cr', currentOver: '_cr_ov' });
   * @example $('.rollover').rollover({ down: '_click' });
   */
  $.fn.rollover = function (options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null,
      down: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    var down = settings.down;
    return this.each(function () {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = isCurrent && currentOver ? current + ext : ext;
      var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;
      $(this).mouseout(function () {
        this.src = src;
      }).mouseover(function () {
        this.src = overSrc;
      });

      if (down) {
        var downSrc = src.replace(search, down + ext);
        new Image().src = downSrc;
        $(this).mousedown(function () {
          this.src = downSrc;
        });
      }
    });
  };

  /**
   * フェードロールオーバー
   *
   * @date 2012-11-21
   *
   * @example $('.faderollover').fadeRollover();
   * @example $('.faderollover').fadeRollover({ over: '-ov' });
   * @example $('.faderollover').fadeRollover({ current: '_cr', currentOver: '_cr_ov' });
   */
  $.fn.fadeRollover = function (options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    return this.each(function () {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = isCurrent && currentOver ? current + ext : ext;
      var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;

      $(this).parent().css('display', 'block').css('width', $(this).attr('width')).css('height', $(this).attr('height')).css('background', 'url("' + overSrc + '") no-repeat');

      $(this).parent().hover(function () {
        $(this).find('img').stop().animate({ opacity: 0 }, 200);
      }, function () {
        $(this).find('img').stop().animate({ opacity: 1 }, 200);
      });
    });
  };

  /**
   * スムーズスクロール
   *
   * @date 2018-01-30
   *
   * @example $.scroller();
   * @example $.scroller({ cancelByMousewheel: true });
   * @example $.scroller({ scopeSelector: '#container', noScrollSelector: '.no-scroll' });
   * @example $.scroller('#content');
   * @example $.scroller('#content', { marginTop: 200, callback: function() { console.log('callback')} });
   */
  $.scroller = function () {
    var self = $.scroller.prototype;
    if (!arguments[0] || _typeof(arguments[0]) === 'object') {
      self.init.apply(self, arguments);
    } else {
      self.scroll.apply(self, arguments);
    }
  };

  $.scroller.prototype = {
    defaults: {
      callback: function callback() {},
      cancelByMousewheel: false,
      duration: 500,
      easing: 'swing',
      hashMarkEnabled: false,
      marginTop: 0,
      noScrollSelector: '.noscroll',
      scopeSelector: 'body'
    },

    init: function init(options) {
      var self = this;
      var settings = this.settings = $.extend({}, this.defaults, options);
      $(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function () {
        var hash = this.hash || '#';
        var eventName = 'click.scroller';

        if (hash !== '#' && !$(hash + ', a[name="' + hash.substr(1) + '"]').eq(0).length) {
          return;
        }

        $(this).off(eventName).on(eventName, function (e) {
          e.preventDefault();
          this.blur();
          self.scroll(hash, settings);
        });
      });
    },

    scroll: function scroll(id, options) {
      var settings = options ? $.extend({}, this.defaults, options) : this.settings ? this.settings : this.defaults;
      if (!settings.hashMarkEnabled && id === '#') return;

      var dfd = $.Deferred();
      var win = window;
      var doc = document;
      var $doc = $(doc);
      var $page = $('html, body');
      var scrollEnd = id === '#' ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top - settings.marginTop;
      var windowHeight = $.ua.isAndroidMobile ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || doc.documentElement.clientHeight;
      var scrollableEnd = $doc.height() - windowHeight;
      if (scrollableEnd < 0) scrollableEnd = 0;
      if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
      if (scrollEnd < 0) scrollEnd = 0;
      scrollEnd = Math.floor(scrollEnd);

      $page.stop().animate({ scrollTop: scrollEnd }, {
        duration: settings.duration,
        easing: settings.easing,
        complete: function complete() {
          dfd.resolve();
        }
      });

      dfd.done(function () {
        settings.callback();
        $doc.off('.scrollerMousewheel');
      });

      if (settings.cancelByMousewheel) {
        var mousewheelEvent = 'onwheel' in document ? 'wheel.scrollerMousewheel' : 'mousewheel.scrollerMousewheel';
        $doc.one(mousewheelEvent, function () {
          dfd.reject();
          $page.stop();
        });
      }
    }
  };

  /**
   * 文字列からオブジェクトに変換したクエリを取得
   *
   * @example $.getQuery();
   * @example $.getQuery('a=foo&b=bar&c=foobar');
   */
  $.getQuery = function (str) {
    if (!str) str = location.search;
    str = str.replace(/^.*?\?/, '');
    var query = {};
    var temp = str.split(/&/);
    for (var i = 0, l = temp.length; i < l; i++) {
      var param = temp[i].split(/=/);
      query[param[0]] = decodeURIComponent(param[1]);
    }
    return query;
  };

  /**
   * 画像をプリロード
   *
   * @date 2012-09-12
   *
   * @example $.preLoadImages('/img/01.jpg');
   */
  var cache = [];
  $.preLoadImages = function () {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  };

  /**
   * タッチデバイスにタッチイベント追加
   *
   * @date 2018-10-03
   *
   * @example $.enableTouchOver();
   * @example $.enableTouchOver('.touchhover');
   */
  $.enableTouchOver = function (target) {
    if (target === undefined) {
      target = 'a, button, .js-touchHover';
    }
    if (!$.ua.isTouchDevice) {
      $('html').addClass('no-touchevents');
    } else {
      $('html').addClass('touchevents');
    }
    $(target).on({
      'touchstart mouseenter': function touchstartMouseenter() {
        $(this).addClass('is-touched');
      },
      'touchend mouseleave': function touchendMouseleave() {
        $(this).removeClass('is-touched');
      }
    });
  };
})(jQuery);

/**
* CHRONOBA
*
* @date 2019-08-22
*/
var CHRONOBA = function ($) {
  var rootElement = document.documentElement;
  var scrollLockModifier = 'is-drawerOpen';
  var scrollbarFixTargets = document.querySelectorAll('.js-scrollbar-fix');
  var scrollableTarget = document.querySelector('.js-scrollable');
  var scrollbarFix = false;
  var touchY = null;
  var header = document.querySelector('.l-header');
  var toggleButton = document.querySelector('.js-toggleDrawer');
  var drawer = document.querySelector('.js-drawer');
  var backdrop = document.querySelector('.js-backdrop');
  var sidebtn = document.querySelector('.js-sidebtn');
  var mqm = window.matchMedia('screen and (max-width: 1120px)');
  var mqs = window.matchMedia('screen and (max-width: 767px)');

  var _init = function _init() {

    $(function () {
      if (!$.ua.isTouchDevice) {
        $('.rollover').rollover();
      }
      if (!$.ua.isMobile) {
        $('a[href^="tel:"]').on('click', function (e) {
          e.preventDefault();
        });
      }
      if (!$.ua.isIE) {
        $('.p-header').css({
          '-webkit-transition': 'height 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms'
        });
        $('.p-header__logo').css({
          '-webkit-transition': 'width 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms, height 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms'
        });
        $('.p-header__icon').css({
          '-webkit-transition': 'width 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms, height 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms'
        });
      }
      $.scroller();
      $.enableTouchOver();
      setTimeout(function () {
        if (rootElement.classList.contains('wf-active') !== true) {
          rootElement.classList.add('loading-delay');
        }
      }, 3000);
      matchHeightCard();
      setTargetBlank();
      setArticleHeight();
      changePaddingHeader();
      if (!location.pathname.match(/contact/)) {
        controlScrollSafari();
        drawerNav();
      }
      showSideBtn();
      layoutFooter();
      objectFitImgs();
      scrollAnimation();
      introAnimation();
    });
  };

  var objectFitImgs = function objectFitImgs() {
    var $objectFitImagesTarget = $('.p-card__img > img');
    if (!$objectFitImagesTarget.length) {
      return;
    }
    objectFitImages($objectFitImagesTarget);
  };

  var scrollAnimation = function scrollAnimation() {
    var target = document.getElementsByClassName('js-waypoint');
    var targetLength = target.length;

    for (var i = 0; i < targetLength; i++) {
      new Waypoint({
        element: target[i],
        handler: function handler() {
          $(this.element).addClass('is-active');
        },
        offset: '95%'
      });
    }
  };

  var matchHeightCard = function matchHeightCard() {
    var $target = $('.p-card__title');
    if (!$target.length) {
      return;
    }
    $target.matchHeight();
  };

  var getScrollY = function getScrollY() {
    return window.scrollY || window.pageYOffset;
  };

  var getWindowWidth = function getWindowWidth() {
    return window.innerWidth;
  };

  var getWindowHeight = function getWindowHeight() {
    return window.innerHeight;
  };

  /**
   * ターゲットブランクにnoopener付与
   */
  var setTargetBlank = function setTargetBlank() {
    $('a').each(function () {
      if ($(this).attr('target') === false) {
        return;
      }
      if ($(this).attr('target') !== '_blank') {
        return;
      }
      $(this).attr('rel', 'noopener');
    });
  };

  /**
  * スクロール制御
  */
  var activateScrollLock = function activateScrollLock() {
    if (rootElement.classList.contains(scrollLockModifier)) {
      return;
    }
    addScrollbarWidth();
    rootElement.classList.add(scrollLockModifier);
  };

  var deactivateScrollLock = function deactivateScrollLock() {
    removeScrollbarWidth();
    rootElement.classList.remove(scrollLockModifier);
  };

  var addScrollbarWidth = function addScrollbarWidth() {
    var scrollbarWidth = window.innerWidth - rootElement.clientWidth;
    if (!scrollbarWidth) {
      scrollbarFix = false;
      return;
    }
    var value = scrollbarWidth + 'px';
    addScrollbarMargin(value);
    scrollbarFix = true;
  };

  var removeScrollbarWidth = function removeScrollbarWidth() {
    if (!scrollbarFix) {
      return;
    }
    addScrollbarMargin('');
  };

  var addScrollbarMargin = function addScrollbarMargin(value) {
    var targetsLength = scrollbarFixTargets.length;
    for (var i = 0; i < targetsLength; i++) {
      scrollbarFixTargets[i].style.marginRight = value;
    }
  };

  /**
  * スクロール制御（iOS Safari対策）
  */
  var controlScrollSafari = function controlScrollSafari() {

    function onTouchStart(event) {
      if (event.targetTouches.length > 1) {
        return;
      }
      touchY = event.targetTouches[0].clientY;
    }

    function onTouchMove(event) {
      if (event.targetTouches.length > 1) {
        return;
      }

      var touchMoveDiff = event.targetTouches[0].clientY - touchY;

      if (scrollableTarget.scrollTop === 0 && touchMoveDiff > 0) {
        event.preventDefault();
        return;
      }

      if (targetTotallyScrolled(scrollableTarget) && touchMoveDiff < 0) {
        event.preventDefault();
      }
    }

    function targetTotallyScrolled(element) {
      return element.scrollHeight - element.scrollTop <= element.clientHeight;
    }

    function onTouchMoveBackdrop(event) {
      if (event.targetTouches.length > 1) {
        return;
      }
      event.preventDefault();
    }

    scrollableTarget.addEventListener('touchstart', onTouchStart, false);
    scrollableTarget.addEventListener('touchmove', onTouchMove, false);
    backdrop.addEventListener('touchmove', onTouchMoveBackdrop, false);
  };

  /**
  * iOSスクロール停止
  */
  var scrollControl = function scrollControl(event) {
    event.preventDefault();
  };

  var noScrollIPhone = function noScrollIPhone() {
    document.addEventListener('touchmove', scrollControl, { passive: false });
  };

  var returnScrollIPhone = function returnScrollIPhone() {
    document.removeEventListener('touchmove', scrollControl, { passive: false });
  };

  var setCarouselMethod = function setCarouselMethod() {
    var $slider = $('.js-slick');
    if (!$slider.length) {
      return;
    }

    $slider.slick({
      infinite: false,
      variableWidth: true,
      swipe: false,
      responsive: [{
        breakpoint: 1121,
        settings: {
          swipe: true,
          variableWidth: false,
          slidesToShow: 2
        }
      }, {
        breakpoint: 768,
        settings: {
          swipe: true,
          variableWidth: false,
          centerMode: true,
          centerPadding: '8vw',
          slidesToShow: 1
        }
      }]
    });

    var slideLength = $('.slick-slide').length;
    var disabledSlide = void 0;

    function handle() {
      $slider.slick('slickGoTo', 0);
      if (mqs.matches) {
        disabledSlide = slideLength - 1;
        $slider.slick('slickSetOption', 'arrows', true, true);
      } else if (mqm.matches) {
        disabledSlide = slideLength - 2;
        $slider.slick('slickSetOption', 'arrows', true, true);
      } else {
        disabledSlide = slideLength - 3;
        if (4 > slideLength) {
          $slider.slick('slickSetOption', 'arrows', false, true);
          $slider.slick('slickSetOption', 'slidesToShow', 3, true);
        }
      }
    }

    mqs.addListener(handle);
    mqm.addListener(handle);
    handle();

    $slider.on('afterChange', function () {
      var current_slide = $(this).slick('slickCurrentSlide');
      if (current_slide === 1) {
        $('.slick-prev').addClass('is-active');
      } else if (current_slide === 0) {
        $('.slick-prev').removeClass('is-active');
      }

      if (current_slide >= disabledSlide) {
        $('.slick-next').addClass('is-disabled');
      } else {
        $('.slick-next').removeClass('is-disabled');
      }
    });

    $('.js-matchHeight').matchHeight();
  };

  var setArticleHeight = function setArticleHeight() {
    var parentElem = document.querySelectorAll('.js-setHeight');
    var elemHeightArray = [];
    var windowWidth = void 0;
    var mq = 1121;

    function setParentElemHeight() {
      elemHeightArray.length = 0;

      for (var i = 0; i < parentElem.length; i++) {
        elemHeightArray[i] = [];

        for (var j = 0; j < parentElem[i].children.length; j++) {
          elemHeightArray[i][j] = parentElem[i].children[j].offsetHeight;
        }
      }

      for (var k = 0; k < elemHeightArray.length; k++) {
        parentElem[k].style.height = Math.max.apply(null, elemHeightArray[k]) + 'px';
      }
    }

    function checkBreakPoint() {
      windowWidth = getWindowWidth();
      if (windowWidth < mq) {
        for (var i = 0; i < parentElem.length; i++) {
          parentElem[i].style.height = 'auto';
        }
      } else {
        setParentElemHeight();
      }
    }

    window.addEventListener('resize', checkBreakPoint);
    $(window).on('load', checkBreakPoint);
    if ($.ua.isIE || $.ua.isSafari) {
      checkBreakPoint();
    }
  };

  var changePaddingHeader = function changePaddingHeader() {

    var isChanged = false;
    var target = document.querySelector('.js-narrowPadding');

    function unchanged() {
      if (!isChanged) {
        return;
      }
      target.classList.remove('is-changed');
      isChanged = false;
    }

    function changed() {
      if (isChanged) {
        return;
      }
      target.classList.add('is-changed');
      isChanged = true;
    }

    function onScroll() {
      var currentScrollY = getScrollY();
      if (currentScrollY === 0) {
        unchanged();
      } else {
        changed();
      }
    }

    window.addEventListener('scroll', onScroll, false);
  };

  var drawerNav = function drawerNav() {

    var drawerOpen = false;

    function setDrawerTop() {
      var headerH = header.clientHeight;
      drawer.style.top = headerH + 'px';
    }

    function changeAriaExpanded(state) {
      var value = state ? 'true' : 'false';
      drawer.setAttribute('aria-expanded', value);
      toggleButton.setAttribute('aria-expanded', value);
    }

    function changeState(state) {
      if (state === drawerOpen) {
        return;
      }
      changeAriaExpanded(state);
      drawerOpen = state;
    }

    function onClickToggleButton() {
      if (drawerOpen) {
        changeState(false);
      } else {
        changeState(true);
      }
      activateScrollLock();
      setDrawerTop();
    }

    function onTransitionendDrawer(event) {
      if (event.target !== drawer || event.propertyName !== 'visibility') {
        return;
      }
      if (!drawerOpen) {
        deactivateScrollLock();
      }
    }

    toggleButton.addEventListener('click', onClickToggleButton, false);
    backdrop.addEventListener('click', onClickToggleButton, false);
    drawer.addEventListener('transitionend', onTransitionendDrawer, false);
  };

  var showSideBtn = function showSideBtn() {

    var sideOpen = true;
    var target = sidebtn.querySelectorAll('a');
    var trigger = document.querySelectorAll('.js-toggleTrigger');

    function changepPointerEvents() {
      var value = sidebtn.getAttribute('aria-hidden') === 'true' ? 'none' : 'auto';
      for (var i = 0; i < target.length; i++) {
        target[i].style.pointerEvents = value;
      }
    }

    function changeAriaHidden(state) {
      var value = state ? 'true' : 'false';
      sidebtn.setAttribute('aria-hidden', value);
      if (state) {
        sidebtn.removeEventListener('transitionend', changepPointerEvents);
        changepPointerEvents();
      } else {
        sidebtn.addEventListener('transitionend', changepPointerEvents);
      }
    }

    function changeState(state) {
      if (state === sideOpen) {
        return;
      }
      changeAriaHidden(state);
      sideOpen = state;
    }

    function onClickTrigger() {
      if (sideOpen) {
        changeState(false);
      } else {
        changeState(true);
      }
    }

    if ($.ua.isTouchDevice) {
      for (var i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', onClickTrigger, false);
      }
    } else {
      sidebtn.addEventListener('mouseenter', onClickTrigger, false);
      sidebtn.addEventListener('mouseleave', onClickTrigger, false);
    }
  };

  var layoutFooter = function layoutFooter() {

    function checkBreakPoint() {
      if (mqs.matches) {

        if (document.querySelector('.p-footer__flex.-middle')) {
          $('.js-flexWrapMiddle').unwrap();
        }
        if (document.querySelector('.p-footer__flex.-large')) {
          $('.js-flexWrapLarge').unwrap();
        }
      } else if (mqm.matches) {

        if (document.querySelector('.p-footer__flex.-large')) {
          $('.js-flexWrapLarge').unwrap();
        }
        $('.js-flexWrapMiddle').wrapAll('<div class="p-footer__flex -middle" />');
      } else {

        if (document.querySelector('.p-footer__flex.-middle')) {
          $('.js-flexWrapMiddle').unwrap();
        }
        $('.js-flexWrapLarge').wrapAll('<div class="p-footer__flex -large" />');
      }
    }

    checkBreakPoint();
    mqs.addListener(checkBreakPoint);
    mqm.addListener(checkBreakPoint);
  };

  var modalUI = function modalUI() {
    var modal = document.querySelector('.js-modal');
    var openbtns = document.querySelectorAll('.js-openModal');
    var openbtnsLength = openbtns.length;
    var targets = document.querySelectorAll('.js-modalTarget');
    var targetsLength = targets.length;
    var backdrop = document.querySelector('.js-backdropModal');
    var closebtns = document.querySelectorAll('.js-closeModal');
    var closebtnsLength = closebtns.length;
    var lastFocusedElement = void 0;
    var focusableElements = void 0,
        lastTabStop = void 0,
        firstTabStop = void 0;

    var onClickOpenButton = function onClickOpenButton(id) {
      TweenMax.to(sidebtn, 0.3, { autoAlpha: 0 });
      modal.setAttribute('aria-hidden', 'false');
      document.body.setAttribute('aria-hidden', 'true');
      modal.tabIndex = 0;
      lastFocusedElement = document.activeElement;
      activateScrollLock();

      var _loop = function _loop(i) {
        var target = targets[i];
        if (target.id === id) {
          var targetH = target.querySelector('.js-modalInner').offsetHeight + target.querySelector('.js-closeModal').offsetHeight * 3; 
          target.style.height = targetH + 'px';
          target.setAttribute('aria-hidden', 'false');
          focusableElements = target.querySelectorAll('button,a');
          firstTabStop = focusableElements[0];
          lastTabStop = focusableElements[focusableElements.length - 1];
          lastTabStop.focus();
          setTimeout(function () {
            target.style.overflowY = 'scroll';
          }, 10);
        }
      };

      for (var i = 0; i < targetsLength; i++) {
        _loop(i);
      }

      modal.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) {
          if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
              e.preventDefault();
              lastTabStop.focus();
            }
          } else {
            if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop.focus();
            }
          }
        }
        if (e.keyCode === 27) {
          onClickCloseButton();
        }
      });
    };

    var onClickCloseButton = function onClickCloseButton() {
      var _loop2 = function _loop2(i) {
        var target = targets[i];
        if (target.getAttribute('aria-hidden') === 'false') {
          target.setAttribute('aria-hidden', 'true');
          setTimeout(function () {
            target.style.overflowY = 'inherit';
          }, 600);
        }
      };

      for (var i = 0; i < targetsLength; i++) {
        _loop2(i);
      }
      TweenMax.to(sidebtn, 0.3, { autoAlpha: 1 });
      modal.setAttribute('aria-hidden', 'true');
      document.body.setAttribute('aria-hidden', 'false');
      modal.tabIndex = -1;
      lastFocusedElement.focus();
      deactivateScrollLock();
    };

    var _loop3 = function _loop3(i) {
      var openbtn = openbtns[i];
      var id = openbtn.getAttribute('data-id');
      openbtn.addEventListener('click', function () {
        onClickOpenButton(id);
      }, false);
    };

    for (var i = 0; i < openbtnsLength; i++) {
      _loop3(i);
    }
    for (var i = 0; i < closebtnsLength; i++) {
      var closebtn = closebtns[i];
      closebtn.addEventListener('click', onClickCloseButton, false);
    }
    backdrop.addEventListener('click', onClickCloseButton, false);
  };

  var slideUp = function slideUp(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  var slideDown = function slideDown(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  var introAnimation = function introAnimation() {
    var $target = $('.js-introAnimation');
    if (!$target.length) {
      return;
    }
    var $title = $('.p-intro__title');
    var $txt = $('.p-intro__txt');
    var $movie = $('.p-intro__movie');
    var $line = $('.p-intro__line');
    var $obj = $('.c-obj');
    var $frame = $('.c-frame');

    var tl = new TimelineMax();
    tl.set([$title, $txt], { y: 30 }).add('start').to($title, 0.7, { y: 0, ease: 'sine.out' }, 'start+=0.5').to($title, 0.6, { autoAlpha: 1 }, 'start+=0.5').to($txt, 0.7, { y: 0, ease: 'sine.out' }, 'start+=0.7').to($txt, 0.6, { autoAlpha: 1 }, 'start+=0.7').to($obj, 1.2, { autoAlpha: 1 }, 'start+=0.7').to($line, 0.6, { autoAlpha: 1 }, 'start+=1.2');

    if ($('.page-vision').length) {
      tl.to($movie, 0.6, { autoAlpha: 1 }, 'start+=1.2');

      if (mqs.matches) {
        tl.to($frame, 1.4, { clip: 'rect(0px 78.66667vw 15px 0px)', ease: Power2.easeOut }, 'start+=0.5');
      } else {
        tl.to($frame, 2, { clip: 'rect(0px 18px 805px 0px)', ease: Power2.easeOut }, 'start+=0.5');
      }
    } else if ($('.page-about').length) {
      if (mqs.matches) {
        tl.to($frame, 1.4, { clip: 'rect(0px 78.66667vw 15px 0px)', ease: Power2.easeOut }, 'start+=0.5');
      } else {
        tl.to($frame, 1.4, { clip: 'rect(0px 18px 350px 0px)', ease: Power2.easeOut }, 'start+=0.5');
      }
    }
  };

  return {
    init: function init() {
      window.console = window.console || {
        log: function log() {}
      };
      _init();
    },
    mqm: mqm,
    mqs: mqs,
    scrollAnimation: scrollAnimation,
    activateScrollLock: activateScrollLock,
    deactivateScrollLock: deactivateScrollLock,
    noScrollIPhone: noScrollIPhone,
    returnScrollIPhone: returnScrollIPhone,
    setCarouselMethod: setCarouselMethod,
    getWindowWidth: getWindowWidth,
    getWindowHeight: getWindowHeight,
    slideUp: slideUp,
    slideDown: slideDown,
    modalUI: modalUI
  };
}(jQuery);

CHRONOBA.init();