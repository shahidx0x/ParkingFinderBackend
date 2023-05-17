
const authenticator = require("../../../middleware/authenticator");
const cloudinaryUploadMiddleware = require("../../../middleware/imageUplaod");
const { update_profile,search_by_email,search_by_cont_no, get_all_user, delete_all_user } = require("./controller");


const manage_router = require("express").Router();

manage_router.post("/user/profile/update/:email",authenticator,cloudinaryUploadMiddleware,update_profile);
manage_router.get("/user/search/email/:email",authenticator,search_by_email);
manage_router.get("/user/list",get_all_user);
manage_router.delete("/user/delete/all",authenticator,delete_all_user);
manage_router.get("/user/search/contno/:cont_no",authenticator,search_by_cont_no);
module.exports = manage_router; 
