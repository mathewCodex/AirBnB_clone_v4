#!/usr/bin/node
// Script that helps to display the amenities
$(document).ready(function () {
    var amenityIds = {};

    function updateAmenitiesList() {
        var checkedAmenities = Object.values(amenityIds);
        var amenitiesString = checkedAmenities.join(', ');
        $('.amenities h4').text(amenitiesString);
    }

    function checkAPIStatus() {    
	    $.ajax({
		    url: 'http://0.0.0.0:5001/api/v1/status/',
		    type: 'GET',
		    success: function (data) {
			    if (data.status === 'OK') {
				    $('#api_status').addClass('available');
			    } else {
				    $('#api_status').removeClass('available');
			    }
		    },
		    error: function () {
			    $('#api_status').removeClass('available');
		    }
	    });
    }

    checkAPIStatus();

    $('input[type="checkbox"]').change(function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenityIds[amenityId] = amenityName;
        } else {
            delete amenityIds[amenityId];
        }

        updateAmenitiesList();
    });
});

