imp_refineSearch = {

  mobBp: 960,

  initMobileForm: function ($frm) {
    if($('.job-list-section > header').length > 0) {
      $frm.insertAfter('.job-list-section > header').parent().addClass('is-hidden');
      $('.collapsible.is-active').removeClass('is-active');
    }
  },

  initDesktopForm: function ($frm) {
    if($('.col-sub .job-search-vertical').length < 1) {
      $frm.appendTo('.col-sub').parent().removeClass('is-hidden');
    }
  },

  initResponsiveSearch: function ($frm) {

    if ($frm && $('.job-list-section > header').length > 0) {
      if (imp_global.siteW < this.mobBp) {
        this.initMobileForm($frm);
      } else {
        this.initDesktopForm($frm);
      }
    }

  },

  init: function () {

    var $frm = $('.refine-form'),
      rs = this,
      curWidth = imp_global.siteW;

    $('.btn-refine').bind('click', function (e) {
      e.preventDefault();
      $frm.parent().toggleClass('is-hidden');
    });

    rs.initResponsiveSearch($frm);

    $(window).resize(function () {
      if(imp_global.siteW !== curWidth) {
        rs.initResponsiveSearch($frm);
      }
    });
    
  }

};