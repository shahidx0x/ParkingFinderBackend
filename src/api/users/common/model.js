const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema(
  {
    profile_image: {
      type: String,
      default:
        "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    },
    username: { type: String, required: true },
    address: { type: String,default:"sewrapara" },
    nick_name: { type: String,default:"iron-man" },
    phone_no: {
      type: String,
      default:0
    },
    nid_image: { type: String, default: "unavailable" },
    licence_image: { type: String, default: "unavailable" },
    role: { type: String, default: "user" },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    dob: { type: String, default: "01/01/1970" },
    gender: { type: String, default: "Male" },
    location: {
      lat: {type:Number,default:0},
      lng: {type:Number,default:0},
    },
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
    vic_list: [
      {
        vic_name: { type: String, default: "remove this when called from front end },
        vic_type: { type: String, default: "remove this when called from front end },
        vic_number: { type: String, default: "remove this when called from front end },
        vic_brand: { type: String, default: "remove this when called from front end },
      },
    ],
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
