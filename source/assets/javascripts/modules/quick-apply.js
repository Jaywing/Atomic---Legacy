imp_quickApply = {

  init: function() {

    var $frm = $('.form-quick-apply'),
        $alerts = $('.form-quick-apply .alert-box'),
        //url = imp_global.buildUrl('/data/quick-apply.json'),
        url = window.location.protocol + '//' + window.location.hostname + '/Forms/Quick-Apply-Ajax-Postback',
        qa = this;

    $frm.validate({
      submitHandler: function(form) {
        $alerts.addClass('is-hidden');

        var frmData = new FormData(form);

        // make ajax request
        $.ajax({
          method: "POST",
          url: url,
          data: frmData,
          processData: false,
          contentType: false,
          beforeSend: function() {
            $frm.addClass('loading');
          },
          success: function(data) {
            $frm.removeClass('loading');
            if (data.Status === 'Success') {
              imp_global.showFormMessage($frm, data.Message, true, true);
            } else {
              imp_global.showFormMessage($frm, data.Message, false, false);
            }
          }
        });
      }
    });
  }
};