const express = require("express");
const router = express.Router();
const Wifi = require("../models/Wifi");
const userWifi = require("../models/UserWifi");
const axios = require("axios");
const moment = require("moment");
const syncDB = require("../public/javascripts/syncdb")

/* GET home page */
router.get("/", (req, res, next) => {
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
        info.save().then(res=>{
          console.log("Informacion guardada de puta madre")
        }).catch(err => {
          console.log(err)
        })
      });
      Wifi.find().then(info => {
        res.render("index", { user: req.user, info, infoStr: JSON.stringify(info)}).catch(e => console.log(e));
      })
      
    });
  })

 
router.get("/new", (req, res, next) => {
  res.render("new", {user: req.user});
 })

 router.post("/new",(req, res, next) => {
  let newWifi = {
   title : req.body.name,
   location : {
    latitude: 3,
    longitude: 3
   }
  }
  userWifi.create(newWifi)
  .then(userwifiCreated =>{
   res.redirect("/");
  })
  .catch(e => console.log(e));

 })
module.exports = router;
