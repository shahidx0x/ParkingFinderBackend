const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema({
  userinfo: [
    {
      profile_image: {
        type: String,
        default:
          "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
      },
      username: { type: String, required: true },
      nick_name: { type: String, required: true },
      cont_no: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^\d{11}$/.test(v);
          },
          message: "Invalid Number",
        },
      },
      nid_image: { type: String, default: "unavilable" },
      licence_image: { type: String, default: "unavilable" },
      role: { type: String, default: "not-set" },
      isVerified: { type: String, default: "not-verified" },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid Email Address",
    },
  },
  password: { type: String, required: true },
});
module.exports = mongoose.model("userModel", userData);
