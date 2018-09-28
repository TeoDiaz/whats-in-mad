const express = require("express");
const router = express.Router();
const Wifi = require("../models/Wifi");
const userWifi = require("../models/UserWifi");
const axios = require("axios");
const moment = require("moment");
const syncDB = require("../public/javascripts/db/syncdb");
const  {ensureLoggedIn} = require('../middlewares/secure-login');

/* GET home page */
router.get("/home", (req, res, next) => {
  Wifi.find().then(info => {
    userWifi.find().then(data => {
      syncDB();
      res
        .render("index", {
          user: req.user,
          info,
          infoStr: JSON.stringify(info),
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});
})

router.get("/", (req, res, next) => {
  syncDB()
  res.render("frontpage", {layout: false});
})

router.get("/userswifi", ensureLoggedIn('/auth/login'), (req, res, next) => {
  userWifi.find().then(userwifi => {
    res.render("userswifi", {
      user: req.user,
      userwifi,
      userWifiStr: JSON.stringify(userwifi)
    })
  }).catch(e => console.log(e))
})


router.get("/new", ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render("new", {
    user: req.user
  });
});

router.post("/new", (req, res, next) => {
  if(req.body.latitude=="" || req.body.longitude==""){
    res.render("new", {user: req.user, error: "Debe seleccionar un punto en el mapa"} )
  }

  let newWifi = {
    title: req.body.name,
    by: req.user.username,
    location: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
  }
  
  userWifi.create(newWifi)
    .then(()=> {
        res.redirect("/userswifi");
      })
      .catch(e => console.log(e));
    
    })

module.exports = router;
