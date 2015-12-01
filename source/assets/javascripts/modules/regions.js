imp_regions = {

  setSelectedRegion: function(value, data) {
    data.region = value;
    return data;
  },

  setSelectedCounty: function(value, data, $region) {
    data.county = value;
    data.region = $region.val();
    return data;
  },

  disableSelect: function ($select) {
    $select.attr('disabled', 'disabled')
      .find('option:first-child').attr('selected', 'selected');
  },

  getCityData: function (selectedData) {
    
    var cityData,
      countyData;

    countyData = this.getCountyData(selectedData);

    if(typeof(countyData) !== 'undefined') {
      countyData.forEach(function (county) {
        if(selectedData.county === county.countyTitle) {
          cityData = county.cities;
        }
      });
    }
    else {
      console.warn('County data not found!');
    }

    return cityData;

  },

  populateCity: function ($region, selectedData) {
    var cityData = this.getCityData(selectedData),
      re = this,
      $city = $region.parents('fieldset').find('.dd-city'),
      selectedCity = $city.attr('data-selected'),
      sHtml;

    sHtml = '<option value="">' + $('option:first-child', $city).text() + '</option>';

    if(typeof(cityData !== 'undefined')) {
      cityData.forEach(function(city) {
        sHtml += re.addDropDownItem(city.cityTitle, city.cityTitle, selectedCity);
      });
    }
    else {
      console.warn('City data not found!');
    }

    $city.html(sHtml)
      .removeAttr('disabled')
      .removeAttr('data-selected');

  },

  getCountyData: function (selectedData) {
    var countyData;

    if(typeof(impDataRegions !== 'undefined')) {
      impDataRegions.forEach(function (region) {
        if(selectedData.region === region.regionTitle) {
          countyData = region.counties;
        }
      });
    }
    else {
      console.warn ('Region data not found!');
    }

    return countyData;
  },

  populateCounty: function ($region, selectedData) {

    var countyData = this.getCountyData(selectedData),
      re = this,
      $county = $region.parents('fieldset').find('.dd-county'),
      $city = $region.parents('fieldset').find('.dd-city'),
      selectedCounty = $county.attr('data-selected'),
      sHtml;
    
    this.disableSelect($city);

    if(selectedData.region === '') {
      this.disableSelect($county);
    }

    if(selectedCounty) {
      selectedData = re.setSelectedCounty(selectedCounty, selectedData, $region);
      $county.removeAttr('data-selected');
    }
    
    if (selectedCounty) {
      re.populateCity($region, selectedData);
    }

    sHtml = '<option value="">' + $('option:first-child', $county).text() + '</option>';

    if(typeof(countyData) !== 'undefined') {
      countyData.forEach(function (county) {
        sHtml += re.addDropDownItem(county.countyTitle, county.countyTitle, selectedCounty);
      });
    }
    else {
      console.warn('County data not found!');
    }

    $county.html(sHtml)
      .removeAttr('disabled');

  },

  addDropDownItem: function (value, text, selectedVal) {
    var sHtml;

    sHtml = '<option value="' + value + '"';
    if (value === selectedVal) {
      sHtml += ' selected="selected"';
    }
    sHtml += '>' + text + '</option>';

    return sHtml;
  },

  populateRegion: function ($region, selectedData) {
    
    var re = this,
      sHtml = '',
      selectedRegion = $region.attr('data-selected');

    if (selectedRegion) re.setSelectedRegion(selectedRegion, selectedData);
    $region.removeAttr('data-selected');

    if(impDataRegions !== 'undefined') {
      impDataRegions.forEach(function (region) {
        sHtml += re.addDropDownItem(region.regionTitle, region.regionTitle, selectedRegion);
      });
    }
    else {
      console.warn('Regions data not found!');
    }

    $region.append(sHtml);

    if (selectedRegion) {
      re.populateCounty($region, selectedData);
    }

  },

  init: function () {

    var re = this,
      $ddRegion = $('.dd-region'); // get region drop downs

    if(impDataRegions && $ddRegion) {

      $ddRegion.each(function () { // initialise each region drop down

        var selectedData = {}, // data object to track selections
          $region = $(this),
          $county = $region.parents('fieldset').find('.dd-county');

        re.populateRegion($region, selectedData); // populate region drop down

        // bind change function to region drop downb
        $region.bind('change', function () {
          // update selected data object
          selectedData = re.setSelectedRegion($(this).val(), selectedData);
          // populate county drop down
          re.populateCounty($(this), selectedData);
        });

        $county.bind('change', function () {
          selectedData = re.setSelectedCounty($(this).val(), selectedData, $region);
          re.populateCity($region, selectedData);
        });

      });
    }

  }

};