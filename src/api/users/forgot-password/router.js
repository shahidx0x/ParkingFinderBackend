const authenticator = require("../../../middleware/authenticator");
const { forgot_password, verifyToken, resetPassword } = require("./controller");

const forgot_pass_router = require("express").Router();

forgot_pass_router.post("/user/forgot-password", forgot_password);
forgot_pass_router.post("/user/verifyToken", verifyToken);
forgot_pass_router.post("/user/resetPassword", resetPassword);

module.exports = forgot_pass_router;
