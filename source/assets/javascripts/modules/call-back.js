imp_callBack = {

  init: function() {

    var $frm = $('.form-request-callback'),
      //url = imp_global.buildUrl('/data/call-back.json'),
      url = window.location.protocol + '//' + window.location.hostname + '/Forms/Request-A-Callback-Ajax-Postback',
      cb = this;

    $frm.validate({

      submitHandler: function (form) {

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
              imp_global.showFormMessage($frm, data.Message, true, false);
            } else {
              imp_global.showFormMessage($frm, data.Message, false, false);
            }
          }

        });

      }
      
    });
  }
 
};