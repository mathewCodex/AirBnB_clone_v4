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

    function places_search() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            type: 'POST',
            contentType: 'application/json',
            data: '{}',
            success: function (places) {
                $('.places article').remove();

                places.forEach(function (place) {
                    var article = $('<article>');
                    var titleBox = $('<div class="title_box">');
                    titleBox.append('<h2>' + place.name + '</h2>');
                    titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
                    article.append(titleBox);
                    var information = $('<div class="information">');
                    information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
                    information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
                    information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
                    article.append(information);
                    article.append('<div class="description">' + place.description + '</div>');

                    $('.places').append(article);
                });
            },
            error: function (error) {
                console.error('Error sending places search request:', error);
            }
        });
    }
    places_search()

    checkAPIStatus();

    $('button').click(function () {
        places_search();
    });

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

