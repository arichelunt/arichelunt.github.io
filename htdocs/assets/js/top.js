/**
 * __SONY_VLOG__
 *
 * @date 2019-11-15
 */


(function ($) {
  const SONY_VLOG = window.SONY_VLOG || {};

  SONY_VLOG.Article = function () {
    let scrollbarWidth;
    let scrollbarFixTargets;

    // 初期化
    const _init = function () {
      document.addEventListener('DOMContentLoaded', () => {
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        scrollbarFixTargets = document.querySelectorAll('.js-scrollbar-fix');
        workAreaModal();
      });
      $(function () {
        questionnaire();
        actionAnchor.init();
        setYT();
      });
    };

    const addScrollbarWidth = () => {
      const value = scrollbarWidth + 'px';
      addScrollbarMargin(value);
      $('.js-scrollbar-fix-btn').css('opacity', 0);
    };

    const removeScrollbarWidth = () => {
      addScrollbarMargin('');
      $('.js-scrollbar-fix-btn').css('opacity', 1);
    };

    const addScrollbarMargin = value => {
      const targetsLength = scrollbarFixTargets.length;
      for (let i = 0; i < targetsLength; i++) {
        scrollbarFixTargets[i].style.marginRight = value;
      }
    };

    const activateScrollLock = () => {
      if (document.documentElement.classList.contains('is-drawerOpen')) return;
      document.documentElement.classList.add('is-drawerOpen');
      addScrollbarWidth();
    };

    const deactivateScrollLock = () => {
      document.documentElement.classList.remove('is-drawerOpen');
      removeScrollbarWidth();
    };

    const scrollControl = function (event) {
      event.preventDefault();
    };

    const noScrollIPhone = function () {
      document.addEventListener('touchmove', scrollControl, { passive: false });
    };

    const returnScrollIPhone = function () {
      document.removeEventListener('touchmove', scrollControl, { passive: false });
    };

    const workAreaModalSlider = id => {
      const $slider_container = $('.js-workAreaModalSliderContainer'),
        $slider = $('.js-workAreaModalSlider'),
        $slider_nav_container = $('.js-workAreaModalSliderNavContainer'),
        $slider_nav = $('.js-workAreaModalSliderNav');

      $slider.on('init', function () {
        $slider_container.addClass('initialized');
      });
      $slider_nav.on('init', function () {
        $slider_nav_container.addClass('initialized');
      });

      $slider.slick({
        arrows: false,
        asNavFor: $slider_nav,
        fade: true,
        initialSlide: parseInt(id),
        waitForAnimate: false
      });

      $slider_nav.slick({
        appendArrows: $slider_nav_container,
        prevArrow: '<div class="slider-arrow slider-prev"></div>',
        nextArrow: '<div class="slider-arrow slider-next"></div>',
        slidesToShow: 5,
        asNavFor: $slider,
        focusOnSelect: true,
        initialSlide: parseInt(id),
        centerMode: true,
        centerPadding: '0px',
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      });

    };

    const workAreaModal = () => {
      const modal = document.querySelector('.js-workAreaModal');
      if (!modal) {
        return;
      }
      const openbtns = document.querySelectorAll('.js-workAreaModalTrigger');
      const openbtnsLength = openbtns.length;
      const backdrop = document.querySelector('.js-workAreaModalBackdrop');
      const closebtn = document.querySelector('.js-workAreaModalClose');
      let workAreaModalOpenFlg = false;

      const onClickOpenButton = id => {
        workAreaModalOpenFlg = true;
        workAreaModalSlider(id);
        modal.setAttribute('aria-hidden', 'false');
        activateScrollLock();
        noScrollIPhone();
      };

      const onClickCloseButton = () => {
        workAreaModalOpenFlg = false;
        modal.setAttribute('aria-hidden', 'true');
      };

      const onTransitionendModal = event => {
        if (workAreaModalOpenFlg || event.propertyName === 'visibility') return;
        $('.js-workAreaModalSlider').slick('unslick');
        $('.js-workAreaModalSliderNav').slick('unslick');
        deactivateScrollLock();
        returnScrollIPhone();
      };

      for (let i = 0; i < openbtnsLength; i++) {
        const openbtn = openbtns[i];
        let id = openbtn.getAttribute('data-id');
        openbtn.addEventListener('click', () => {
          onClickOpenButton(id);
        }, false);
      }
      backdrop.addEventListener('click', onClickCloseButton, false);
      closebtn.addEventListener('click', onClickCloseButton, false);
      modal.addEventListener('transitionend', onTransitionendModal, false);
    };


    const actionAnchor = function () {
      let $window,
        $productsLink,
        $endpointSection,
        endPoint,
        windowHeight,
        anchorPosition,
        addOffsetPosition,
        showPosition,
        scrollPosition;

      const _init = () => {
        _setElement();
        _setInitValue();
        _bind();
      };

      const _setElement = () => {
        $window = $(window);
        $productsLink = $('.js-productsLink');
        $endpointSection = $('#recommend');
      };

      const _setInitValue = () => {
        windowHeight = $window.innerHeight();
        showPosition = $('.vl-contentsArea_inner').offset().top;
        anchorPosition = ($.ua.isMobile || $.ua.isTablet) ? $('.vl-contentsArea_inner').offset().top : showPosition + $productsLink.outerHeight();
        addOffsetPosition = ($.ua.isMobile || $.ua.isTablet) ? 150 : 80;
      };

      const _bind = () => {
        $window.on('load resize', _addOffsetPosition);
        $window.on('load resize', _setInitValue);
        $window.on('scroll', _scroll);
      };

      const _addOffsetPosition = () => {
        endPoint = $endpointSection.offset().top;
        if (990 <= $window.width()) {
          addOffsetPosition = 150;
        } else {
          addOffsetPosition = 80;
        }
      };

      const _scroll = () => {
        scrollPosition = $window.scrollTop() + windowHeight;
        if (scrollPosition >= anchorPosition + addOffsetPosition) {
          $productsLink.addClass('is-show');
          if (scrollPosition >= endPoint) {
            $productsLink.removeClass('is-show');
          } else {
            $productsLink.addClass('is-show');
          }
        } else {
          $productsLink.removeClass('is-show');
        }
      };

      return {
        init: _init
      };
    }();


    const setYT = function () {
      // Unt.UntYTPlayer is Object type, not fucntion type due to be as Singleton
      const _yt = Unt.UntYTPlayer;
      const $player = $('.js-load-video');

      _yt.init({  // also you can use _yt.setGlobal() as well
        sprefix: $player.eq(0).attr('data-videoId'),
        debug: true,
        alert: false,
      });

      $(window).on('load', function () {
        for (let i = 0; i < $player.length; i++) {
          _yt.generatePlayer({
            container: $player.eq(i),
            name: $player.eq(i).attr('data-videoId'),
            videoId: $player.eq(i).attr('data-videoId'),
            stoken: $player.eq(i).attr('data-stoken'),
            playerVars: {
              end: (i === 0) ? 331 : 252,
              rel: 0
            }
          });
        }
      });
      $(window).on('beforeunload pagehide', _yt.sendStatisticsData);
    };

    const questionnaire = () => {
      $('#questionnaire__del').click(function () {
        $('#questionnaire').fadeOut('normal');
      });
      // 参照元：https://www.sony.jp/cyber-shot/include/js/sidebanner.js
    };

    return {
      init: _init
    };
  }();

  SONY_VLOG.Article.init();
})(jQuery);