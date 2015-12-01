imp_sendToFriend = {

  init: function() {

    var $frm = $('.form-send-to-friend'),
        $alerts = $('.form-send-to-friend .alert-box'),
        //url = imp_global.buildUrl('/data/send-to-friend.json'),
        url = window.location.protocol + '//' + window.location.hostname + '/Forms/Send-To-A-Friend-Ajax-Postback',
        sf = this;

    $frm.validate({
      submitHandler: function (form) {
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