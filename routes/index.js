const express = require("express");
const router = express.Router();
const Wifi = require("../models/Wifi");
const axios = require("axios");
const moment = require("moment");
const syncDB = require("../public/javascripts/syncdb")

/* GET home page */
router.get("/", (req, res, next) => {
  Wifi.find().then(info=>{
  syncDB();
  res
    .render("index", { user: req.user, info, infoStr: JSON.stringify(info) })
    .catch(e => console.log(e));
  })
});

module.exports = router;
