
const express = require('express');
const routes = require("./src/routes");

var bodyParser = require("body-parser");
var swaggerJsDoc = require("swagger-jsdoc")
var swaggerUI = require("swagger-ui-express");
var cors = require('cors');

const port = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());



const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "SGS NodeJS Base API",
      description: "This is API documentation for XYZ NodeJS backend",
      version: "3.0.0",
      contact: {
        name: "Special Man Global Solution LTD",
        email: "support@specialmansolution.com"
      },
      servers: ["http://localhost:" + port]
    },
    basePath: '/api/v1'
  },
  apis: ['./src/routes/v1/*.js', './src/models/*.js']
};



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));


app.use("/api", routes);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization, Observe");
  next();
});


module.exports = app;