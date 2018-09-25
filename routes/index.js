const express = require('express');
const router  = express.Router();
const Wifi = require("../models/Wifi");

/* GET home page */
router.get('/', (req, res, next) => {
  Wifi.find().then(wifi => {
    res.render('index', {
      user: req.user,
      wifi,
      wifiStr : JSON.stringify(wifi)
    });
  })
  //console.log(Wifi.find({obj}))
});

module.exports = router;
