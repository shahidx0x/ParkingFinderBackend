const { signup, signin } = require("./controller");

const auth_router = require("express").Router();

auth_router.post("/signup/user", signup);
auth_router.post("/signin/user", signin);
module.exports = auth_router;
