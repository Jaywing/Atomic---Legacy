imp_map = {

  initGmap: function ($map, count) {
    var loc = new google.maps.LatLng($map.attr('data-lat'), $map.attr('data-lng')),
        opts = {
          zoom: 14,
          center: loc
        },
        mymap,
        map,
        marker,
        mapid = 'gmap' + count;

    $map.attr('id', mapid);

    mymap = document.getElementById(mapid);

    map = new google.maps.Map(mymap, opts);
    marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: $map.attr('data-map-title')
    });

  },

  init: function () {

    var gm = this,
      i = 1;

    if(google.maps) {

      $('.gmap').each(function() {
        gm.initGmap($(this), i);
        i++;
      });

    }

  }

};