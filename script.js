var map;
var infowindow;

function initMap() {
    var halifax = { lat: 44.64867, lng: -63.593603 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: halifax,
        zoom: 10
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    var request_params = {
        location: halifax,
        radius: 25000,
        type: ['church']
    };

    service.nearbySearch(request_params, callback);

    service.textSearch({
        location: halifax,
        radius: 25000,
        query: 'churches OR church OR churchs in Halifax'
    }, callback)
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            addToParagraph(results[i]);
        }
    }
}

function createMarker(place) {

    //get more details about the location
    // service.getDetails({
    //     placeId: place.place_id
    // }, function (result, status) {
    //     details = `${result.name}<br/>${result.formatted_address}<br/>${result.formatted_phone_number}`;
    // });

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    })

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(`${place.name}<br/>
                               ${place.formatted_address}<br/>
                               ${place.formatted_phone_number}<br/>
                               ${place.website}`);
        infowindow.open(map, this);
    })
};

function addToParagraph(place) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: place.place_id
    }), function (result, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            $("#results").append(`<li>${result.name}<br/>${result.formatted_address}<br/>${result.formatted_phone_number}</li>`);
        }
    }
};

$(document).ready(function () {
    initMap();
})