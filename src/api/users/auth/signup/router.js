const { signup, viewusers, signin } = require("./controller");

const signup_router = require("express").Router();
signup_router.post("/signup/user", signup);
module.exports = signup_router;

