#!/usr/bin/node
// Script that helps to display the amenities
$(document).ready(function () {
    var amenityIds = {};

    function updateAmenitiesList() {
        var checkedAmenities = Object.values(amenityIds);
        var amenitiesString = checkedAmenities.join(', ');
        $('.amenities h4').text(amenitiesString);
    }

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

