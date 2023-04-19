const swagger_router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

swagger_router.use("/", swaggerUi.serve);
swagger_router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = swagger_router;