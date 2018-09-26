let input = document.addEventListener(
  "DOMContentLoaded",
  () => {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 14
    });
    var infoWindow = new google.maps.InfoWindow({
      map: map
    });
    let pos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
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
          let rad = document.getElementById("slide").value;
          rad = parseInt(rad);
          map.setCenter(pos);
          //dibuja circulo
          for (var city in citymap) {
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
          $('#slide').on('input change', function(){
            console.log(this.value)
            rad = parseInt(this.value)
            circle.setRadius(rad)
            $(this).next($('.slider_label')).html(this.value);
            
            printInfoMarkers()
          });
          // document.getElementById("slide").onchange = function() {
          //     circle.setRadius(rad);
          //     console.log(parseInt(rad))
          //   }
          
          
          let printInfoMarkers = ()=>{
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
              new google.maps.Marker({
                position: {
                  lat: item.location.latitude,
                  lng: item.location.longitude
                },
                map: map,
                title: item.title
              });
            }
          });
        }
        printInfoMarkers()


        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
    }
  },
  false
);
