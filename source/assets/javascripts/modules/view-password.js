imp_view_password = {

  toggleField: function ($field) {
    if ($field.attr('type') === 'password') {
      $field.attr('type', 'text');
    } else {
      $field.attr('type', 'password');
    }
    $field.focus();
  },

  toggleButton: function ($btn) {
    $btn.toggleClass('is-active');
  },

  initShowHidePwd: function ($ele) {
    
    var $pwdField = $('.password', $ele),
      pw = this;

    $('.btn-show-hide', $ele).bind('click', function (e) {
      e.preventDefault();

      pw.toggleButton($(this));
      pw.toggleField($pwdField);

    });

  },

  init : function() {

    var pw = this;
    
    $('.show-hide-pwd').each(function () {
      pw.initShowHidePwd($(this));
    });

  }
};