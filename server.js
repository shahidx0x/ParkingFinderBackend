const express = require("express")                                          ;
require("dotenv").config()                                                  ;
const app = express()                                                       ;
const port = process.env.PORT || 9000                                       ;
const cors = require("cors")                                                ;
require("colors")                                                           ;
const bodyParser = require("body-parser")                                   ;
const connectDB = require("./src/config/database")                          ;
const serverLog = require("./src/middleware/serverLog")                     ;
const swagger_router = require("./src/api/swagger-ui/router")               ;
const auth_router = require("./src/api/users/auth/router")                  ; 
const manage_router = require("./src/api/users/manage-user/router")         ;
const forgot_pass_router = require("./src/api/users/forgot-password/router");

//  middleware
app.set("view engine", "ejs"                      );
app.use(express.static("./")                      );
app.use(cors()                                    );
app.use(bodyParser.json()                         );
app.use(bodyParser.urlencoded({ extended: true })) ;

//custom middleware
app.use(serverLog);

// Routers
app.use(swagger_router);
app.use(auth_router);
app.use(manage_router);
app.use(forgot_pass_router);

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`.bgCyan);
});
