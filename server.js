const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const cors = require("cors");
require("colors");
const bodyParser = require('body-parser');
const connectDB = require('./src/config/database');
const serverLog = require("./src/middleware/serverLog");
const swagger_router = require('./src/api/swagger-ui/router');
const signup_router = require("./src/api/users/auth/signup/router");


//  middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//custom middleware
app.use(serverLog);


// Routers
app.use(swagger_router);
app.use(signup_router);



// Connect to the database
  connectDB();



app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan);

});
