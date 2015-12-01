
imp_accordion = {

  init: function () {

    $('.accordion').each(function () {
    	var $acc = $(this),
    		is_collapsible = $acc.hasClass('collapsible');

      $acc.accordion({
        heightStyle: "content",
        collapsible: is_collapsible
      });
    });

  }
  
};