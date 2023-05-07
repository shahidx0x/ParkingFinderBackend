const mongoose = require('mongoose');
//const colors = require('colors')
require("dotenv").config();
const DB_URI =
  `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@tflop.zzorco6.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[info] => Successfully connected to the database'.green);
  } catch (error) {
    console.error('[failed] => Error connecting to the database'.red, error);
    process.exit(1);
  }
};

module.exports = connectDB;
