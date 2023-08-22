const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingData = new Schema({
  email: String,
  parkingData: {},
});
module.exports = mongoose.model("parkingModel", parkingData);
