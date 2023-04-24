const swagger_router  = require("express"           ).Router();
const swaggerUi       = require("swagger-ui-express")         ;
const swaggerDocument = require("./swagger.json"    )         ;

swagger_router.use("/", swaggerUi.serve);
swagger_router.get(
  "/",
  swaggerUi.setup(swaggerDocument, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
  })
);

module.exports = swagger_router;
