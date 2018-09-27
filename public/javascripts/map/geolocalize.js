let input = document.addEventListener(
  "DOMContentLoaded",
  () => {
    let marker;
    let newMarkers = [];
    const setPosOnForm = (latlng) => {
      document.getElementById('lat-pos').value = latlng.lat;
      document.getElementById('lng-pos').value = latlng.lng;
    }

    let map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 14
    });
    let infoWindow = new google.maps.InfoWindow({
      map: map
    });
    let pos;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          new google.maps.Marker({
            position: pos,
            map: map
          });
          var citymap = {
            madrid: {
              center: pos,
              population: 3293000
            }
          };
          let circle;
          let rad = $("#slide").val();
          rad = parseInt(rad);
          map.setCenter(pos);
          //dibuja circulo
          for (let city in citymap) {
            // Add the circle for this city to the map.
            circle = new google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map: map,
              center: citymap[city].center,
              radius: rad


            });
          }
          $("#slide").on("input change", function () {
            rad = parseInt(this.value);
            circle.setRadius(rad);
            $(this)
              .next($(".slider_label"))
              .html(this.value);
            removeMarkers();
            printInfoMarkers();
            changeZoom()
          });

          let printInfoMarkers = () => {

            info.forEach(item => {
              let itemPos = new google.maps.LatLng(
                item.location.latitude,
                item.location.longitude
              );
              let myPos = new google.maps.LatLng(pos);
              if (
                google.maps.geometry.spherical.computeDistanceBetween(
                  myPos,
                  itemPos
                ) < circle.radius
              ) {
                marker = new google.maps.Marker({
                  position: {
                    lat: item.location.latitude,
                    lng: item.location.longitude
                  },
                  map: map,
                  title: item.title
                });
                newMarkers.push(marker);
              }
            });
          };
          printInfoMarkers();
          let changeZoom = () => {
            if (rad > 500) {
              map.setZoom(15);
            }
            if (rad > 700) {
              map.setZoom(14);
            }
            if (rad > 1500) {
              map.setZoom(13);
            }
            if (circle.radius > 2500) {
              map.setZoom(12);
            }
          }
          let removeMarkers = () => {
            for (let i = 0; i < newMarkers.length; i++) {
              newMarkers[i].setMap(null);
            }
          };

        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  

  },
  false
);