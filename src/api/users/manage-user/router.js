const authenticator = require("../../../middleware/authenticator");
const {
  update_profile,
  search_by_email,
  get_all_user,
  delete_all_user,
} = require("./controller");

const manage_router = require("express").Router();

manage_router.post(
  "/user/profile/update/:email",
  authenticator,
  update_profile
);
manage_router.get("/user/search/email/:email", authenticator, search_by_email);
manage_router.get("/user/list", get_all_user);
manage_router.delete("/user/delete/all", authenticator, delete_all_user);
module.exports = manage_router;
