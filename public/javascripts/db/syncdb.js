const axios = require("axios");
const moment = require("moment")
const Wifi = require("../../../models/Wifi");

const syncDB = () => {
  let now = moment();
  if (Wifi.find()) {
    updateOrCreateDB();

    Wifi.find().then(info => {
      if (moment(info[0].createdAt) < now.subtract(12, 'h')) {
        updateOrCreateDB();
      }
    })
  } else {
    updateOrCreateDB();

  }
}

const updateOrCreateDB = () => {
  axios
    .get("https://datos.madrid.es/egob/catalogo/216619-0-wifi-municipal.json")
    .then(info => {
      info.data["@graph"].forEach(e => {
        info = new Wifi({
          title: e.title,
          location: {
            latitude: e.location.latitude,
            longitude: e.location.longitude
          },
          organization: {
            accesibility: e.organization.accesibility,
            schedule: e.organization.schedule,
            services: e.organization.services
          }
        });
        Wifi.collection.drop();
        info
          .save()
          .then(res => {
            console.log("Creado")
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

module.exports = syncDB