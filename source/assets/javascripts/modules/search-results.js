imp_searchResults = {

  doChange: function (val, type) {
    var url = window.location.href.split('?'),
        qs, params;

    if(url.length > 1) {
      qs = url[1];
      params = qs.split('&');
      if(qs.indexOf(type) > -1) {
        for(var i=0, x=params.length; i < x; i++) {
          if(params[i].indexOf(type) > -1) {
            params[i] = type + '=' + val;
          }
        }
      } else {
        params.push(type + '=' + val);
      }
      qs = params.join('&');
    } else {
      qs = type + '=' + val;
    }
    
    url = url[0] + '?' + qs;
    window.location = url;
  },

  init: function () {

    var sr = this;

    $('#sort-by').bind('change', function () {
      sr.doChange($(this).val(), 'sort-by');
    });

    if($('#results-pp')) {
      $('#results-pp').bind('change', function () {
        sr.doChange($(this).val(), 'results');
      })
    }
    
  }

};