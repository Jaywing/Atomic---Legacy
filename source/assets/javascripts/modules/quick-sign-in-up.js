imp_quickSignInUp = {

  modalInstance: $('[data-remodal-id=login-register]').remodal(),

  settings: {
    frmMethod: null,
    frmMethodValue: null,
    aniDelay: 500  
  },

  activateLogin: function () {

    var qs = this;

    // add class to page wrapper div
    $('#page').addClass('is-logged-in');

    // activate update animation
    setTimeout(function () {
      imp_global.addAnimationClass($('.user-status.is-logged-in .user-status-inner'), 'is-changed', 1500);
    }, qs.settings.aniDelay);
    
    // update global variable
    imp_global.isLoggedIn = true;
    
    // close modal window
    this.modalInstance.close();

  },
  // populate logged in user details in the header
  updateUserDetails: function (data) {
    
    var $userStatus = $('.user-status.is-logged-in'),
      username,
      profilePic = data.profilePic;

    if(data.firstName || data.lastName) {
      username = data.firstName + ' ' + data.lastName;
      $('#user-status-text', $userStatus).html(username);
    }

    if(profilePic) {
      $('#user-profile-pic', $userStatus)
        .attr('src', profilePic)
        .attr('alt', username);
      $userStatus.addClass('has-profile-pic');
    }
    if(data.hasNotifications) {
      $userStatus.addClass('has-notifications');
    }
  },
  // user is successfully loged in
  loginSuccess: function (userData) {

    var qs = this,
      val = this.settings.frmMethodValue;

    this.updateUserDetails(userData);
    this.activateLogin();

    switch(this.settings.frmMethod) {
      case 'save-job':
        // init save job (remove timeout for production)
        setTimeout(function () {
          imp_jobListItem.saveJob(
            qs.settings.frmMethodValue,
            true,
            $('.job-list-item[data-job-id=' + val + '] .save-job')
          );
        }, qs.settings.aniDelay);
        
        break;
    
      case 'save-search':
        // init save search (remove timeout for production)
        setTimeout(function () {
          imp_saveSearch.saveSearch(qs.settings.frmMethodValue);
        }, qs.settings.aniDelay);

        break;

    }
      
  },

  initForm: function ($form, type) {

    var qs = this,
      // this needs refactoring with service url
      url = imp_global.buildUrl('/data/' + type + '.json');

    $form.validate({
      submitHandler: function() {
        // transform form data into js object
        var formData = $form.serialize(); 

        // make ajax request
        $.ajax({
          method: "GET",
          url: url,
          data: formData,
          success: function(data) {
            if (data.status === 'success') {
              qs.loginSuccess(data.user);
            } else {

            }
          }
        });
        // prevent the form from submitting
        return false;

      }

    });

  },

  openModal: function (method, val) {

    // set init method (eg. save-job or save-search)
    this.settings.frmMethod = method;
    // set init value (eg. jobId or searchParams)
    this.settings.frmMethodValue = val;

    // open modal
    this.modalInstance.open();
  },

  init: function () {

    // initialise both forms
    this.initForm($('#form-login'), 'login');
    this.initForm($('#form-register'), 'register');

  }

};