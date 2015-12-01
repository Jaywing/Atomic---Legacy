imp_tweets = {

  handleSingleTweet: function (tweet) {
    
    var $holding = $('.latest-tweet .tw-holding'),
      tweetText,
      userName,
      userUrl;

    $holding.html(tweet);

    tweetText = $('.tweet', $holding).html();
    userName = $('[data-scribe="element:screen_name"]', $holding).html();
    userUrl = $('.user a', $holding).attr('href');

    $('.latest-tweet .lead').html(tweetText);
    $('.latest-tweet cite a').html('<i class="icon-twitter"></i>' + userName).attr('href', userUrl);
    
    $holding.html('');

  },
  
  latestTweet: function ($ele, widgetId) {
    var config1 = {
      "id": widgetId,
      "domId": '',
      "maxTweets": 1,
      "enableLinks": true,
      "showPermalinks": false,
      "customCallback": this.handleSingleTweet
    };
    if(twitterFetcher) twitterFetcher.fetch(config1);
  },

  init: function () {

    var tw = this;

    $('.twitter-mod').each(function () {
      var $mod = $(this),
        widgetId = $mod.attr('data-widget-id');

      if(widgetId) {
        if($mod.hasClass('latest-tweet')) {
          tw.latestTweet($mod, widgetId);
        }
      }

    });

  }
  
};