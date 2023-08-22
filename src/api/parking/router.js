const {
  parking_data,
  add_parking,
  get_specific,
  update_specific,
  delete_specific,
} = require("./controller");

const parking_router = require("express").Router();

parking_router.delete("/parking/delete/:id", delete_specific);
parking_router.get("/parking/all/data", parking_data);
parking_router.post("/add/parking", add_parking);
parking_router.get("/get/parking/:email", get_specific);
parking_router.patch("/update/parking/:email", update_specific);
module.exports = parking_router;
