imp_global = {

  siteW: null,
  siteH: null,
  isLoggedIn: $('#page').hasClass('is-logged-in'),
  equalHeightsTotal: 1,

  setDimensions: function () {

    this.siteW = window.innerWidth;
    this.siteH = window.innerHeight;

  },

  ie: function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    
    return v > 4 ? v : undef;
    
  },

  setBreakpoints: function () {
    $(window).setBreakpoints({
      // use only largest available vs use all available
      distinct: true,
      // array of widths in pixels where breakpoints should be triggered
      breakpoints: [
        320, 480, 768, 960, 1120, 1280, 1440, 1600
      ]
    });
  },

  toggleAriaProp: function ($ele, prop) {

    if ($ele.attr('aria-' + prop) === 'true') {
      $ele.attr('aria-' + prop, 'false');
    } else {
      $ele.attr('aria-' + prop, 'true');
    }

  },

  toggleOnOffIcon: function($ele, isOn, toggleClass) {

    // get the on/off state text from html
    var altText = $ele.attr('data-alt-text'),
        $text = $('.text', $ele),
        curText = $text.html();
    
    $ele.toggleClass(toggleClass);

    $ele.attr('data-alt-text', curText);
    $text.html(altText);

    // added update animation
    imp_global.addAnimationClass($ele, 'is-saved-changed', 1000);
  },

  addAnimationClass: function ($ele, animClass, duration) {

    $ele.addClass(animClass).addClass('animated');
    
    setTimeout(function () {
      $ele.removeClass('animated').removeClass(animClass);
    }, duration);

  },

  showFormMessage: function ($frm, msg, success, hideForm) {
    var $box;

    if(success) {
      $box = $('.alert-box-ok', $frm);
      $frm.trigger("reset");
    } else {
      $box = $('.alert-box-error', $frm);
    }

    $('.message', $box).html(msg);
    $box.removeClass('is-hidden');

    if(hideForm) {
      $('fieldset, .form-controls', $frm).fadeOut();
    }
  },

  /* This section is for development only
    Remove for production 
  */
  previewUrl: 'http://impellampatternlibrary.preview8.jaywing.com/components/v1',
  buildUrl: function (url) {
    
    var devUrl;

    if(window.location.href.indexOf(this.previewUrl) !== -1) {
      devUrl = this.previewUrl + url;
    } else {
      devUrl = url;
    }

    return devUrl;

  },

  skipToFix: function () {
    window.addEventListener("hashchange", function(event) {
      var element = document.getElementById(location.hash.substring(1));
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
        }
        element.focus();
      }
    }, false); 
  },
  
  /*
  End of dev only content
   */

  init: function () {

    var gl = this;

    gl.setDimensions();
    
    $(window).resize(function () {
      gl.setDimensions();
    });

    gl.setBreakpoints();
    gl.skipToFix();

  }

};