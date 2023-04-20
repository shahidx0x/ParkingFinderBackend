const { forgot_password, verifyAndUpdatePassword } = require("./controller");

const forgot_pass_router = require("express").Router();

forgot_pass_router.post("/forgot-password", forgot_password);
forgot_pass_router.post("/verifyAndUpdatePassword", verifyAndUpdatePassword);

module.exports = forgot_pass_router;
