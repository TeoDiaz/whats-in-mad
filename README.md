<p align="center">
  <img src="https://i.imgur.com/1QgrNNw.png">
  <img src="https://github.com/WhatsInMad/whats-in-mad/blob/master/public/images/logomad.png" height="99" width="99">
</p>    
<p align="center">  
<span><a href="https://github.com/WhatsInMad/whats-in-mad">What's In Mad</a></span>
</p>  

## Introducción  
Os traemos la aplicacion definitiva para no quedarte desconectado en MADRID 

## Herramientas
JavaScript (Base)  
Mongoose  
Axios/Ajax    
Materialize   
jQuery  
Gmaps API  
datos.madrid.es API   
Express  
Passport  

## ¿Cuál ha sido el mayor problema técnico al que nos hemos enfrentado?  
Implementar el metodo computeDistanceBetween de Google, el cual calcula el punto entre el centro del circulo y un marker. Con esa informacion conseguimos que se muestren solamente los markers de el radio marcado


## ¿Cual es el mayor reto por solucionar en nuestro código?
Poder escalar la aplicacion a mas cosas

## Si empezaramos de cero ¿Cómo organizaría el proyecto?
Leeriamos la documentacion de distintos motores de mapa con el fin de elegir el mas apropiado


## Un detalle técnico interesante sobre mi proyecto
``` js
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
                  title: item.title,
                  icon: "../../images/wifired.png",
                  content: item.organization.schedule
              });
              newMarkers.push(marker);  
              }
              
            });
          };
          printInfoMarkers();

```


