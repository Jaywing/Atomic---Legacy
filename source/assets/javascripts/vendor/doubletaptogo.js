/*
 By Osvaldas Valutis, www.osvaldas.info
 Available for use under the MIT License
 */


;
(function ($, window, document, undefined) {
  $.fn.doubleTapToGo = function (params) {

    if (!( 'ontouchstart' in window ) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

    var currentItem = false;

    this.each(function () {

      $(this).on('click', function (e) {
        var item = $(this);
        if (item[0] != currentItem[0]) {
          e.preventDefault();
          currentItem = item;
        } else {
          console.log("Same");
        }
      });

      $(document).on('click touchstart MSPointerDown', function (e) {

        var resetItem = true,
          parents = $(e.target).parents();

        for (var i = 0; i < parents.length; i++) {
          if (parents[i] === currentItem[0]) {
            resetItem = false;
          }
        }

        if (resetItem)
          curItem = false;
      });
    });
    return this;
  };
})(jQuery, window, document);