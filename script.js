// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:

var map;
var infowindow;

function initMap() {
    var halifax = { lat: 44.64867, lng: -63.593603};

    map = new google.maps.Map(document.getElementById('map'), {
        center: halifax,
        zoom: 11
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: halifax,
        radius: 50000,
        type: ['church']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    console.log(getMoreDetails(place));

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(`${place.name}<br/>${place.place_id}<br/>${place.formatted_address}`);
        infowindow.open(map, this);
    });
}

function getMoreDetails(place){
    var service = new google.maps.places.PlacesService(map);

    return service.getDetails({
        placeId: place.place_id
    }, function(result, status){
        console.log(`${result.name}\n
        ${result.formatted_address}\n
        ${result.formatted_phone_number}\n`);
    });
}