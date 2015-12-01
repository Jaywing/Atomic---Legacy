imp_collapsible_tabs = {

  tabsBP: 768,
  desktopInit: false,
  activeClass: 'is-active',
  movableTabs: false,
  retractable: false,
  currentMode: 'mobile',

  deactivateAllTabs: function ($tabs) {
    
    $('.collapsible-tabs-content-destination .collapsible-tabs-content-item', $tabs)
      .removeClass(this.activeClass);
    $('.tab-controls li', $tabs).removeClass(this.activeClass);

  },

  activateTab: function ($tab, $tabs) {

    var $target = $($tab.attr('href')),
      $listItem = $tab.parent(),
      isOpen = $listItem.hasClass(this.activeClass),
      ct = this;
    
    
    if(ct.retractable && isOpen) {
      ct.deactivateAllTabs($tabs);
    }

    if (!isOpen) {
      ct.deactivateAllTabs($tabs);
      $listItem.addClass(ct.activeClass);
      setTimeout(function () {
        $target.addClass(ct.activeClass);
      }, 300);
    }

  },

  enableDesktopMode: function ($tabs) {

    var ct = this,
      $target = $('.collapsible-tabs-content-destination', $tabs);

    ct.currentMode = 'desktop';

    if (ct.movableTabs) {
      // loop through items in mobile holder
      $('.collapsible-tabs-content .collapsible-tabs-content-item').each(function () {
        $target.append($(this)); // move them to desktop holder
      });
    }

    if (!ct.desktopInit) {
      $('.tab-controls a', $tabs).bind('click', function (e) {
        e.preventDefault();
        ct.activateTab($(this), $tabs);
        ct.desktopInit = true;
      });
    }

    // destroy collapsible component funcitonality
    if(imp_collapsible) imp_collapsible.destroy($('.collapsible-tabs-content-destination'));

  },

  enableMobileMode: function ($tabs) {

    var $target = $('#' + $tabs.attr('data-tab-content')),
        ct = this;

    ct.currentMode = 'mobile';

    // loop through items in desktop holder
    $('.collapsible-tabs-content-destination .collapsible-tabs-content-item').each(function () {
      $target.append($(this)); // move them to the mobile holder
    });

    // initialise collapsible component funcitonality
    if(imp_collapsible) imp_collapsible.init($('.collapsible-tabs-content'));

  },

  // deterimines whether to initiate mobile or desktop view
  initTabs: function ($tabs) {

    var tab_content = $tabs.attr('data-tab-content'),
      retractable = $tabs.attr('data-retractable'),
      $mobTarget;

    if(tab_content) {
      this.movableTabs = true;
    }
    if(retractable) {
      this.retractable = true;
    }

    if (this.movableTabs) {

      $mobTarget = $('#' + $tabs.attr('data-tab-content'));

      if (imp_global.siteW >= this.tabsBP) { // desktop size

        // if desktop is not yet initialised
        if ($('.collapsible-tabs-content-destination .collapsible-tabs-content-item', $tabs).length < 1) {
          this.enableDesktopMode($tabs); // initialise desktop
        }

      } else { // mobile size

        // if mobile is not yet initialised
        if ($('.collapsible-tabs-content-item', $mobTarget).length < 1) {
          this.enableMobileMode($tabs); // initialise mobile
        }

      }

    } else {
      this.enableDesktopMode($tabs);
    }
  },

  init: function () {
    
    var ct = this;

    if(imp_global.ie() <= 9) {
      $('[href=#tab-quick-apply]', $('.tab-controls')).parent().hide();
    }

    $('.collapsible-tabs').each(function () {
      
      var $tabs = $(this);
      
      ct.initTabs($tabs);

      // check sizes on resize
      $(window).resize(function () {
        ct.initTabs($tabs);
      });

    });

  }
};