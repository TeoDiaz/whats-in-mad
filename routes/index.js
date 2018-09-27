const express = require("express");
const router = express.Router();
const Wifi = require("../models/Wifi");
const userWifi = require("../models/UserWifi");
const axios = require("axios");
const moment = require("moment");
const syncDB = require("../public/javascripts/db/syncdb")

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
          data,
          dataStr: JSON.stringify(data)
        })
        .catch(e => console.log(e));
    })

  })

});

router.get("/", (req, res, next) => {
  syncDB()
})


router.get("/new", (req, res, next) => {
  res.render("new", {
    user: req.user
  });
})

router.post("/new", (req, res, next) => {
  let newWifi = {
    title: req.body.name,
    location: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
  }
  userWifi.create(newWifi)
    .then(userwifiCreated => {
      res.redirect("/");
    })
    .catch(e => console.log(e));

})
module.exports = router;