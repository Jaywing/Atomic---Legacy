imp_primaryNav = {

  mobBp: 768,
  prevItem: '.logo',
  nextItem: '.user-status a',
  navSwitchItems: 5,
  currentMode: '',

  toggleMobileNav: function () {
    var $nav = $('#nav');

    if ($nav.hasClass('is-active')) {
      this.closeAllPrimaryItems();
    }
    $nav.toggleClass('is-active');
  },

  removeMobileNav: function () {

    this.closeAllPrimaryItems();
    $('#nav .nav-top-level > li > a').unbind('click');

  },

  removeDesktopNav: function () {

    this.closeAllPrimaryItems();
    $('#nav .nav-top-level > li > a').unbind('focus');

  },

  closeAllPrimaryItems: function () {

    $('#nav .nav-top-level > li.is-active').removeClass('is-active');

  },

  initMobileNav: function () {

    var pn = this;

    $('#nav .nav-top-level > li > a').click(function (e) {

      var $item = $(this).parent();

      if (!$item.hasClass('is-active')) {
        e.preventDefault();
        pn.closeAllPrimaryItems();
        $item.addClass('is-active');
      }

    });
    pn.currentMode = 'mob';
  },

  initDesktopNav: function () {

    var pn = this;

    $('#nav .nav-top-level > li > a').bind('focus', function () {

      var $link = $(this),
        $item = $link.parent();

      pn.closeAllPrimaryItems();
      $item.addClass('is-active');

    });

    $('#nav .nav-top-level ul a').bind('focus', function () {
      var $link = $(this),
        $parentItem = $link.parent().parent().parent();

      //console.log($parentItem.hasClass('is-active'));

      if(!$parentItem.hasClass('is-active')) {
        pn.closeAllPrimaryItems();
        $parentItem.addClass('is-active');
      }

    });

    $('#nav .nav-top-level').bind('blur', function () {
      pn.closeAllPrimaryItems();
    });

    $('.nav-top-level > .has-children-true > a').doubleTapToGo();

    pn.currentMode = 'dt';

  },

  initNav: function () {
    var pn = this;
    if (imp_global.siteW < pn.mobBp) {
      if(this.currentMode === 'dt') { pn.removeDesktopNav(); }
      if(this.currentMode !== 'mob') { pn.initMobileNav(); }
    } else {
      pn.initDesktopNav();
      if(this.currentMode === 'mob') { pn.removeMobileNav(); }
      if(this.currentMode !== 'dt') { pn.initDesktopNav(); }
    }
  },

  init: function () {

    var pn = this,
        $tlNav = $('.nav-top-level');

    $('.nav-toggle').click(function (e) {
      e.preventDefault();
      pn.toggleMobileNav();
    });

    pn.initNav();

    // check sizes on resize
    $(window).resize(function () {
      pn.initNav();
    });

    $(pn.prevItem).bind('focus', function () {
      pn.closeAllPrimaryItems();
    });

    $(pn.nextItem).bind('focus', function () {
      pn.closeAllPrimaryItems();
    });

    if($tlNav.find('> li').length <= this.navSwitchItems) {
      $('.nav-container').addClass('shortNav');
    }

  }
};