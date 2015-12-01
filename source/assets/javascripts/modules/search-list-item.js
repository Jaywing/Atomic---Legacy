imp_searchListItem = {

  savedClass: 'is-saved',
  saveUrl: imp_global.buildUrl('/data/save-search.json'),
  notificationsUrl: imp_global.buildUrl('/data/save-search.json'),
  saveTitleUrl:  imp_global.buildUrl('/data/save-search.json'),

  saveSearch: function (searchId, isSaved, $ele) {
    
    var sli = this,
      searchData = { 'searchId': searchId }; // data object

    // send ajax request
    $.ajax({
      method: "GET",
      url: sli.saveUrl,
      data: searchData,
      success: function(data) {
        if (data.status === 'success') {
          imp_global.toggleOnOffIcon($ele, isSaved, sli.savedClass);
        } else {

        }
      }
    });

  },

  enableNotifications: function (searchId, isEnabled, $ele) {
    
    var sli = this,
      searchData = { 'searchId': searchId }; // data object

    // send ajax request
    $.ajax({
      method: "GET",
      url: sli.notificationsUrl,
      data: searchData,
      success: function(data) {
        if (data.status === 'success') {
          imp_global.toggleOnOffIcon($ele, isEnabled, sli.savedClass);
        } else {

        }
      }
    });

  },

  saveSearchTitle: function (title, searchId, $ele) {
    var sli = this,
      searchData = {
        'searchId': searchId,
        'searchTitle': title
      },
      $header = $ele.parents('header');


    // send ajax request
    $.ajax({
      method: "GET",
      url: sli.saveTitleUrl,
      data: searchData,
      success: function(data) {
        if (data.status === 'success') {
          $header.find('h3 a:first-child').html(title);
          $header.removeAttr('class');
        } else {

        }
      }
    });

  },

  init: function () {

    var sli = this;

    // initialise Save Search functionality
    $('.save-search').bind('click', function (e) {
      e.preventDefault();

      var searchId = $(this).parents('.search-list-item').attr('data-search-id'),
        $ele = $(this),
        isSaved = $ele.hasClass(sli.savedClass);

      sli.saveSearch(searchId, isSaved, $ele);

    });

    // initialise Notifications functionality
    $('.enable-notifications').bind('click', function (e) {
      e.preventDefault();

      var searchId = $(this).parents('.search-list-item').attr('data-search-id'),
        $ele = $(this),
        isSaved = $ele.hasClass(sli.savedClass);

      sli.enableNotifications(searchId, isSaved, $ele);

    });

    $('.search-list-item button').bind('click', function (e) {
      e.preventDefault();

      var $btn = $(this),
        $input = $btn.parent().find('input'),
        searchId = $btn.parents('.search-item').attr('data-search-id'),
        $header = $btn.parents('header'),
        newTitle = $input.val();

      if(newTitle !== '') {
        sli.saveSearchTitle(newTitle, searchId, $btn);
      } else {
        $header.removeClass('is-editing');
      }

    });

    $('.edit', $('.search-list-item')).bind('click', function (e) {
      e.preventDefault();

      var $edit = $(this),
        $header = $edit.parents('header'),
        $input = $header.find('input');

      $header.addClass('is-editing');
      $input.focus();

    });
  }
};