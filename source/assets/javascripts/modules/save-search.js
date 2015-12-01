imp_saveSearch = {

  saveUrl: imp_global.buildUrl('/data/save-search.json'),

  displayNewSavedSearch: function (newsearch) {

    var $savedSearches = $('.my-searches.saved-searches'),
      $ssList = $('ul', $savedSearches),
      $item = $('<li><a href=""></a></li>');

    $item.find('a').html(newsearch.title).attr('href', newsearch.url);

    $ssList.append($item);

    if (!$savedSearches.hasClass('has-saved-searches')) {
      $savedSearches.addClass('has-saved-searches');
    }

    imp_global.addAnimationClass($('.my-searches.saved-searches ul li:last-child'), 'is-changed', 1500);
    
  },

  saveSearch: function (params) {

    var ss = this,
      searchData = {};

    if(params !== '') {
      searchData = ss.getParamsJson(params);      
    }

    // send ajax request to save search
    $.ajax({
      method: "GET",
      url: ss.saveUrl,
      data: searchData,
      success: function(data) {
        ss.displayNewSavedSearch(data.search);
      },
      error: function(xhr,status,error) {
        console.log(status);
      }
    });
    
  },

  getParamsJson: function(params) {
    
    // generate json object from search params
    return JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

  },

  getSearchParams: function () {

    // get params from query string
    var aUrl = window.location.href.split('?'),
      params;

    if (aUrl.length > 1) {
      params = aUrl[1];
      params = params.split('#')[0];
    }

    return params;
  },

  init: function () {

    var ss = this;

    // save search button is clicks
    $('.btn-savesearch').bind('click', function (e) {
      e.preventDefault();

      var searchParams = ss.getSearchParams();

      // check logged in status
      if (imp_global.isLoggedIn) {

        ss.saveSearch(searchParams);

      } else {

        // Launch quick login/register
        imp_quickSignInUp.openModal('save-search', searchParams);

      }

    });

  }
};