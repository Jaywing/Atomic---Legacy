imp_alertBoxes = {

  closeBox: function (ele) {

    var $box = $(ele).closest('.alert-box'),
        aniDuration = 600;

    imp_global.addAnimationClass($box, 'is-hidden', aniDuration);

    setTimeout(function () { //hide
      $box.addClass('hide');
    }, aniDuration);

  },

  init: function () {

    var ab = this;

    $('.alert-box-close').on('click', function () {
      ab.closeBox(this);
    });

  }
  
};