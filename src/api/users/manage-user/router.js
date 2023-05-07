
const authenticator = require("../../../middleware/authenticator");
const { updateProfile, searchByEmail, searchByCont_no } = require("./controller");


const manage_router = require("express").Router();

manage_router.post("/user/profile/update/:email",updateProfile);
manage_router.get("/user/search/email/:email",searchByEmail);

manage_router.get("/user/search/contno/:cont_no",searchByCont_no);
module.exports = manage_router;
