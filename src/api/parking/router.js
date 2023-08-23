const {
  parking_data,
  add_parking,
  get_specific,
  update_specific,
  delete_specific,
  delete_all,
} = require("./controller");

const parking_router = require("express").Router();

parking_router.delete("/parking/delete/:email", delete_specific);
parking_router.get("/parking/all/data", parking_data);
parking_router.post("/add/parking", add_parking);
parking_router.get("/get/parking/:email", get_specific);
parking_router.patch("/update/parking/:email", update_specific);
parking_router.delete("/delete/all/parking", delete_all);
module.exports = parking_router;
