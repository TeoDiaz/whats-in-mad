const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wifiSchema = new Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  description: String
});


wifiSchema.index({location: "2dsphere"})
const Wifi = mongoose.model("Wifi", wifiSchema);
module.exports = Wifi;