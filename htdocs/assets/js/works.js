/**
* CHRONOBA.Works
*
* @date 2019-08-22
*/

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Works = function () {
  var mqm = CHRONOBA.mqm;
  var activateScrollLock = CHRONOBA.activateScrollLock;
  var deactivateScrollLock = CHRONOBA.deactivateScrollLock;
  var noScrollIPhone = CHRONOBA.noScrollIPhone;
  var returnScrollIPhone = CHRONOBA.returnScrollIPhone;
  var getWindowHeight = CHRONOBA.getWindowHeight;
  var $gallery = $('.js-detailModalGallery');

  var _init = function _init() {
    selectFilterUI();
    detailModal();
    featureLayout();
    window.addEventListener('resize', setDetailModalSize);
  };

  var selectFilterUI = function selectFilterUI() {
    var tabs = document.querySelectorAll('.js-tab');
    if (!tabs) {
      return;
    }
    var panels = document.querySelectorAll('.js-tabpanel');
    var tabsLength = tabs.length;

    var currentSelectedTabIndex = void 0;

    function getCurrentSelectedTabIndex() {
      return currentSelectedTabIndex;
    }

    function getIndexOfTab(tabElement) {
      var matchedIndex = -1;
      for (var i = 0; i < tabsLength; i++) {
        if (tabs[i] === tabElement) {
          matchedIndex = i;
          break;
        }
      }
      return matchedIndex;
    }

    function setCurrentSelectedTabIndex(index) {
      currentSelectedTabIndex = index;
    }

    function onClickTab(event) {
      var clickedTab = event.currentTarget;
      var clickedIndex = getIndexOfTab(clickedTab);
      var currentIndex = getCurrentSelectedTabIndex();
      if (clickedIndex === currentIndex) {
        return;
      }

      changeTab(clickedIndex, currentIndex);
      setCurrentSelectedTabIndex(clickedIndex);
    }

    function changeTab(nextIndex, currentIndex) {
      var nextTab = tabs[nextIndex];
      var nextPanel = panels[nextIndex];
      show(nextTab, nextPanel);

      if (currentIndex > -1) {
        var currentTab = tabs[currentIndex];
        var currentPanel = panels[currentIndex];
        hide(currentTab, currentPanel);
      }
    }

    function show(tab, panel) {
      tab.setAttribute('aria-selected', 'true');
      tab.removeAttribute('tabindex');
      panel.setAttribute('aria-hidden', 'false');
    }

    function hide(tab, panel) {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-hidden', 'true');
    }

    function isSelectedTab(tab) {
      var ariaSelected = tab.getAttribute('aria-selected');
      return ariaSelected === 'true';
    }

    function initialize() {
      for (var i = 0; i < tabsLength; i++) {
        var tab = tabs[i];
        var isSelected = isSelectedTab(tab);
        if (isSelected) {
          changeTab(i);
          setCurrentSelectedTabIndex(i);
        }
        tab.addEventListener('mouseover', onClickTab, false);
        tab.addEventListener('click', onClickTab, false);
      }
    }

    initialize();
  };

  var setDetailModalSize = function setDetailModalSize() {
    var modalContent = document.querySelector('.modal__content');
    if (!modalContent) {
      return;
    }
    var modalContentH = modalContent.offsetHeight + 70;
    var windowHeight = getWindowHeight();

    if (windowHeight < modalContentH) {
      modalContent.style.height = '100%';
      modalContent.style.padding = '50px 0';
      modalContent.style.overflowY = 'scroll';
    } else {
      modalContent.style.height = 'auto';
      modalContent.style.padding = '0';
      modalContent.style.overflowY = 'visible';
    }
  };

  var detailModalGallery = function detailModalGallery(id) {
    $gallery.slick({
      slide: '.modal__item',
      appendArrows: $('.modal__gallery'),
      prevArrow: '<div class="modal__arrow -prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 37"><path fill="rgb(12, 13, 10)" d="M19.049,35.410 L18.341,36.117 L0.942,18.717 L1.140,18.520 L0.938,18.318 L18.338,0.919 L19.045,1.626 L2.154,18.517 L19.049,35.410 Z"/></svg></div>',
      nextArrow: '<div class="modal__arrow -next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 37"><path fill="rgb(12, 13, 10)" d="M19.062,18.713 L1.662,36.114 L0.955,35.406 L17.846,18.514 L0.951,1.622 L1.658,0.915 L19.058,18.313 L18.860,18.511 L19.062,18.713 Z"/></svg></div>',
      initialSlide: parseInt(id)
    });
  };

  var detailModal = function detailModal() {
    var modal = document.querySelector('.js-detailModal');
    if (!modal) {
      return;
    }
    var openbtns = document.querySelectorAll('.js-detailModalOpen');
    var openbtnsLength = openbtns.length;
    var backdrop = document.querySelector('.js-detailModalBackdrop');
    var closebtn = document.querySelector('.js-detailModalClose');

    function onClickOpenButton(id) {
      modal.setAttribute('aria-hidden', 'false');
      detailModalGallery(id);
      setDetailModalSize();
      activateScrollLock();
      noScrollIPhone();
    }

    function onClickCloseButton() {
      modal.setAttribute('aria-hidden', 'true');
    }

    function onTransitionendModal(event) {
      if (event.target !== modal || event.propertyName !== 'visibility') {
        return;
      }
      deactivateScrollLock();
      returnScrollIPhone();
      $gallery.slick('unslick');
    }

    var _loop = function _loop(i) {
      var openbtn = openbtns[i];
      var id = openbtn.getAttribute('data-id');
      openbtn.addEventListener('click', function () {
        onClickOpenButton(id);
      }, false);
    };

    for (var i = 0; i < openbtnsLength; i++) {
      _loop(i);
    }

    backdrop.addEventListener('click', onClickCloseButton, false);
    closebtn.addEventListener('click', onClickCloseButton, false);
    modal.addEventListener('transitionend', onTransitionendModal, false);
  };

  var featureLayout = function featureLayout() {

    function checkBreakPoint() {
      if (mqm.matches) {

        if (document.querySelector('.p-feature__flex')) {
          $('.js-wrapFeature').unwrap();
        }
      } else {

        $('.js-wrapFeature').wrapAll('<div class="p-feature__flex">');
      }
    }

    checkBreakPoint();
    mqm.addListener(checkBreakPoint);
  };

  return {
    init: _init
  };
}();

CHRONOBA.Works.init();