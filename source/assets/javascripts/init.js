;(function ($) {

  'use strict';

  // Init Globals module
  if(imp_global) imp_global.init();

  //Other modules
  var modules = [
    {moduleName: imp_primaryNav, el: $('#nav')},
    {moduleName: imp_jobsearch, el: $('#form-job-search')},
    {moduleName: imp_jobListItem, el: $('.job-list-item')},
    {moduleName: imp_searchListItem, el: $('.search-list-item')},
    {moduleName: imp_alertBoxes, el: $('.alert-box')},
    {moduleName: imp_sideNav, el: $('#sidebar-nav-menu-toggle')},
    {moduleName: imp_accordion, el: $('.accordion')},
    {moduleName: imp_tabs, el: $('.tabs')},
    {moduleName: imp_validate, el: $('.form-validate')},
    {moduleName: imp_collapsible, el: $('.collapsible')},
    {moduleName: imp_view_password, el: $('.pw-showhide')},
    {moduleName: imp_collapsible_tabs, el: $('.collapsible-tabs')},
    {moduleName: imp_saveSearch, el: $('.btn-savesearch')},
    {moduleName: imp_regions, el: $('.dd-regions')},
    {moduleName: imp_tweets, el: $('.twitter-mod')},
    {moduleName: imp_quickSignInUp, el: $('#login-register')},
    {moduleName: imp_quickApply, el: $('.form-quick-apply')},
    {moduleName: imp_callBack, el: $('.form-request-callback')},
    {moduleName: imp_sendToFriend, el: $('.form-send-to-friend')},
    {moduleName: imp_refineSearch, el: $('.btn-refine')},
    {moduleName: imp_searchResults, el: $('#sort-by')},
    {moduleName: imp_social_share, el: $('.social-media-share')},
    {moduleName: imp_map, el: $('.gmap')}
  ];

  // Loop through modules and check both moduleName and element are present
  modules.forEach(function (module) {
    initModules(module.moduleName, module.el);
  });

  /**
   * Check modules have both name and initiliser element, init modules
   * @param name {obj} The object name for the module
   * @param el {obj} jQuery object of an element that is needed to initialise the module
   * @author anthony.fisher@jaywing.com
   */
  function initModules(moduleName, el){
    if (moduleName && (el.length > 0)) {
      moduleName.init($);
    }
  }

})(jQuery);