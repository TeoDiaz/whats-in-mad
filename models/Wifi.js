const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wifiSchema = new Schema({
  title: String,
  location: {
  latitude: Number,
  longitude: Number,
  },
  organization: {
  accesibility: String,
  schedule: String,
  services: String
  }
});


wifiSchema.index({location: "2dsphere"})
const Wifi = mongoose.model("Wifi", wifiSchema);
module.exports = Wifi;