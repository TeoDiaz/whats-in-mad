var geocoder;
var map;
var marker;
let pos;
function initialize() {
  let map = new google.maps.Map(
    document.getElementById("map-user"), {
      center: new google.maps.LatLng(37.4419, -122.1419),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        new google.maps.Marker({
          position: pos,
          map: map
        });
        map.setCenter(pos);
      })
    }
  google.maps.event.addListener(map, "click", function(e) {

    latLng = e.latLng;
    console.log(e.latLng.lat());
    console.log(e.latLng.lng());
    document.getElementById('lat-pos').value = e.latLng.lat();
    document.getElementById('lng-pos').value = e.latLng.lng();

    console.log("Marker");
    // if marker exists and has a .setMap method, hide it
    if (marker && marker.setMap) {
      marker.setMap(null);
    }
    marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  });
}
google.maps.event.addDomListener(window, "load", initialize)