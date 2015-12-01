imp_social_share = {
  init: function() {
    //Open social share in new window
    $('.social-media-share .nav-social a').on('click', function(e) {
      e.preventDefault();

      var shareUrl = $(this).attr('href'),
        wWidth = window.innerWidth,
        wHeight = window.innerHeight,
        wSizeWidth = wWidth / 3,
        wSizeHeight = wHeight / 3,
        wTopPos = (wHeight / 3) - (wSizeHeight / 3),
        wLeftPos = (wWidth / 2) - (wSizeWidth / 2),
        wTitle = 'ShareThisArticle',
        wSettings = 'scrollbars="yes",width=' + wSizeWidth + ',height=' + wSizeWidth + ',left=' + wLeftPos + ',top=' + wTopPos;

      //console.log(windowSettings);

      window.open(shareUrl, wTitle, wSettings);
    });
  }
}
