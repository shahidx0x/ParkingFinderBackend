const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema(
  {
    userinfo: [
      {
        profile_image: {
          type: String,
          default:
            "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
        },
        username: { type: String, required: true },
        address: { type: String },
        nick_name: { type: String },
        cont_no: {
          type: String,
         
        },
        nid_image: { type: String, default: "unavilable" },
        licence_image: { type: String, default: "unavilable" },
        role: { type: String, default: "user" },
        isEmailVerified: { type: Boolean, default: false },
        isPhoneVerified: { type: Boolean, default: false },
        dob: { type: String, default: "01/01/1970" },
        gender: { type: String, default: "Male" },
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
    deviceToken: { type: String },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("userModel", userData);
