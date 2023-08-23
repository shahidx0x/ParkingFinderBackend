const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingData = new Schema({
  email: String,
  parkingData: Schema.Types.Mixed,
});
module.exports = mongoose.model("parkingModel", parkingData);
