imp_jobListItem = {

  savedClass: 'is-saved',
  saveUrl: imp_global.buildUrl('/data/save-job.json'),

  // save / unsave job
  toggleSaveJob: function (isSaved, $ele) {
    
    // get the on/off state text from html
    var altText = $ele.attr('data-alt-text'),
        $text = $('.text', $ele),
        curText = $text.html();
    
    $ele.toggleClass(this.savedClass);

    $ele.attr('data-alt-text', curText);
    $text.html(altText);

    // added update animation
    imp_global.addAnimationClass($ele, 'is-saved-changed', 1000);

  },

  saveJob: function (jobId, isSaved, $ele) {
    
    var jli = this,
      jobData = { 'jobId': jobId }; // data object

    // send ajax request
    $.ajax({
      method: "GET",
      url: jli.saveUrl,
      data: jobData,
      success: function(data) {
        if (data.status === 'success') {
          jli.toggleSaveJob(isSaved, $ele);
        } else {

        }
      }
    });

  },

  init: function () {

    var jli = this;

    // initialise Save Job functionality
    $('.save-job').bind('click', function (e) {
      e.preventDefault();

      var jobId = $(this).parents('.job-list-item').attr('data-job-id'),
        $ele = $(this),
        isSaved = $ele.hasClass(jli.savedClass);

      if(imp_global.isLoggedIn) {

        jli.saveJob(jobId, isSaved, $ele);

      } else {
        
        // Launch quick login/register
        imp_quickSignInUp.openModal('save-job', jobId);

      }

    });
  }
};