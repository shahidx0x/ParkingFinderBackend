
const cloudinaryUploadMiddleware = require("../../../middleware/imageUplaod");
const { signup, signin } = require("./controller");


const auth_router = require("express").Router();

auth_router.post("/signup/user",cloudinaryUploadMiddleware, signup);
auth_router.post("/signin/user", signin);
module.exports = auth_router;
