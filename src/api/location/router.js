const authenticator = require("../../../middleware/authenticator");
const { update_location } = require("./controller");
const location_router = require("express").Router();

location_router.patch(
  "/user/location/update/:email",
  authenticator,
  update_location
);
module.exports = location_router;
