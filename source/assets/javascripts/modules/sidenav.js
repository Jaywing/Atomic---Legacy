imp_sideNav = {

	toggleNav: function ($ele) {
		$ele.parent().toggleClass('is-active');
	},

  init: function () {

  	var sn = this;

    $('#sidebar-nav-menu-toggle').click(function (e) {
    	e.preventDefault();
    	sn.toggleNav($(this));
    });
  }
};