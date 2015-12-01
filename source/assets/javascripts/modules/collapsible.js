imp_collapsible = {

  toggleCollapsible: function ($ele) {
    $ele.toggleClass('is-active');
    imp_global.toggleAriaProp($ele, 'expanded');
  },

  initCollapsible: function ($ele, index) {
    var cl = this,
      isOpen = $ele.hasClass('is-active'),
      $header = $('> :first-child', $ele).wrap('<a></a>').parent(),
      $content = $('> :last-child', $ele),
      contentId = 'cl' + index + '_content';

    $ele.attr('id', contentId)
      .attr('aria-expanded', isOpen);

    $header.addClass('collapsible-header')
      .attr('aria-controls', contentId)
      .attr('href', '#' + contentId);

    $header.find('> :first-child').addClass('collapsible-header-child');

    $content.addClass('collapsible-content');

    $header.bind('click', function (e) {
      e.preventDefault();
      cl.toggleCollapsible($ele);
    });

  },

  destroyCollapsible: function ($ele, index) {

    var headerContent = $('.collapsible-header', $ele).html();
    
    $ele.removeClass('is-active').removeAttr('id');
    $ele.removeAttr('aria-expanded');
    $('.collapsible-header', $ele).remove();
    $ele.prepend(headerContent);
    $('.collapsible-content', $ele).removeClass('collapsible-content');

  },

  init: function () {

    var cl = this,
      clIndex = 0;

    $('.collapsible').each(function () {
      var $this = $(this);
      clIndex++;
      if($this.find('.collapsible-header').length < 1) {
        cl.initCollapsible($this, clIndex);
      }
    });

  },

  destroy: function($range) {

    var cl = this;

    $('.collapsible', $range).each(function () {
      cl.destroyCollapsible($(this));
    });

  }
  
};