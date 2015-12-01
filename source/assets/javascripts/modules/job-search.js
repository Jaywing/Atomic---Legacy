imp_jobsearch = {
/*
  sectors: {

    // generates the HTML for sector option
    addSectorItem: function (sector, selectedId) {

      var optHTML = '<option value="' + sector.sectorValue + '"';

      if (sector.sectorValue === selectedId) {
        optHTML += ' selected="selected"'; // make selected
      }
      optHTML += '">' + sector.sectorTitle + '</li>';

      return optHTML;
    },

    // returns HTML for the sub sector dropdown (uses addSectorItem )
    getSubSectors: function (subSectors, selectedId) {
      var subSectorHTML = "",
          se = this;

      if(typeof(subSectors) !== 'undefined') {
        subSectors.forEach(function(subSector) {
          subSectorHTML += se.addSectorItem(subSector, selectedId);
        });
      }

      return subSectorHTML;
    },

    // generates HTML for both sector dropdowns
    populateDropDown: function (topLevel, sectorId, selectedId) {
      var sectorHTML = "",
        sectors = impDataSectors,
        iSubs,
        subData,
        se = this;

      if(typeof(sectors) !== 'undefined') {
        sectors.forEach(function (sector) {
          if (topLevel) { // top level dropdown
            sectorHTML += se.addSectorItem(sector, selectedId);
          } else {
            if (sectorId === "") {
              // no sector selected
              subData = sector.subSectors;
              iSubs = subData.length;
              if (iSubs > 0) {
                sectorHTML += '<optgroup label="' + sector.sectorValue + '">';

                sectorHTML += se.getSubSectors(subData, selectedId);

                sectorHTML += '</optgroup>';
              } else {
                sectorHTML += se.addSectorItem(sector, selectedId);
              }
            } else {

              if (sectorId === sector.sectorValue) {
                subData = sector.subSectors;
                sectorHTML += se.getSubSectors(subData, selectedId);
              }
            }
          }
        });
      }
      else {
        console.warn('No sectors found!');
      }

      return sectorHTML;

    },

    init: function () {

      var sc = this,
        selectedSectorId = $('#sector').attr('data-sector-id'), // if sector is already selected
        selectedSubSectorId = $('#sub-sector').attr('data-subsector-id'), // if sub-sector is already selected
        animationClass = 'is-changed',
        $sector = $('#sector');

      if($('option', $sector).length < 2) {
        $sector
          .append(sc.populateDropDown(true, "", selectedSectorId)) // populate sector dropdown
          .change(function () { // when sector dropdown changes, re-populate sub sector dropdown

            var val = $(this).val(),
              firstopt = '<option value="">' + $('#sub-sector option:first-child').html() + '</option>',
              $subSector = $('#sub-sector');

            $subSector
              .html(firstopt + sc.populateDropDown(false, val, "")); // populate sub sector based on sector value

            imp_global.addAnimationClass($subSector, animationClass, 1500);

          });
        $('#sub-sector').append(this.populateDropDown(false, selectedSectorId, selectedSubSectorId)); // populate sub-sector dropdown
      }

    }

  },
*/
  // open / close advance search options
  toggleAdvancedSearch: function () {

    var activeClass = 'is-adv-active',
      $advSearch = $('#adv-job-search');

    $('#form-job-search').toggleClass(activeClass);

    imp_global.toggleAriaProp($advSearch, 'hidden'); // accessibility

  },

  // update value on screen when a slider is changed
  updateSlider: function (input, value, outputId) {
    var sliderOutput = document.getElementById(outputId),
        sliderMax = input.getAttribute('max');

    if(value === sliderMax) {
      sliderOutput.innerHTML = value + '+';
    }
    else {
      sliderOutput.innerHTML = value;
    }

  },

  init: function () {

    var js = this,
      $form = $('#form-job-search');

    // initialise advance search toggle
    $('.show-hide-adv a', $form).click(function (e) {
      e.preventDefault();
      js.toggleAdvancedSearch();
    });

    // initialise sector dropdowns
    /*
    if(impDataSectors) {
      js.sectors.init();
    }
    */
  }

};