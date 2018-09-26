const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userWifiSchema = new Schema({
  title: String,
  location: {
  latitude: Number,
  longitude: Number,
  }
},{
  timestamps: true

});


userWifiSchema.index({location: "2dsphere"})

const userWifi = mongoose.model("UserWifi", userWifiSchema);
module.exports = userWifi;