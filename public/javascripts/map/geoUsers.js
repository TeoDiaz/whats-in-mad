document.addEventListener(
  "DOMContentLoaded",
  () => {
    let userMarker;
    let newUserMarkers = [];


    let mapUser = new google.maps.Map(document.getElementById("map-user"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 14
    });

    let infoWindow = new google.maps.InfoWindow({
      map: mapUser
    });
    let posUser;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          posUser = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          new google.maps.Marker({
            position: posUser,
            map: mapUser
          });
          var citymap = {
            madrid: {
              center: posUser,
            }
          };
          let circle;
          let rad = $("#slide-user").val();
          rad = parseInt(rad);
          mapUser.setCenter(posUser);
          //dibuja circulo
          for (let city in citymap) {
            // Add the circle for this city to the map.
            circle = new google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map: mapUser,
              center: citymap[city].center,
              radius: rad


            });
          }
          $("#slide-user").on("input change", function () {
            rad = parseInt(this.value);
            circle.setRadius(rad);
            $(this)
              .next($(".slider_label"))
              .html(this.value);
            removeMarkers();
            printUserMarkers();
            changeZoom()
          });

          let printUserMarkers = () => {

            userwifi.forEach(item => {
              let itemPos = new google.maps.LatLng(
                item.location.latitude,
                item.location.longitude
              );
              let myPos = new google.maps.LatLng(posUser);
              if (
                google.maps.geometry.spherical.computeDistanceBetween(
                  myPos,
                  itemPos
                ) < circle.radius
              ) {
                userMarker = new google.maps.Marker({
                  position: {
                    lat: item.location.latitude,
                    lng: item.location.longitude
                  },
                  map: mapUser,
                  title: `${item.title} - ${item.by}`,
                  icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                newUserMarkers.push(userMarker);
                console.log("pasan users")
              }
            });
          };
          printUserMarkers();
          let changeZoom = () => {
            if (rad > 500) {
              mapUser.setZoom(15);
            }
            if (rad > 700) {
              mapUser.setZoom(14);
            }
            if (rad > 1500) {
              mapUser.setZoom(13);
            }
            if (circle.radius > 2500) {
              mapUsermap.setZoom(12);
            }
          }
          let removeMarkers = () => {
            for (let i = 0; i < newUserMarkers.length; i++) {
              newUserMarkers[i].setMap(null);
            }
          };

        },
        function () {
          handleLocationError(true, infoWindow, mapUser.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, mapUser.getCenter());
    }



  },
  false
);