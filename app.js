const express = require('express');
const routes = require("./src/routes");

  


var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "sample API",
        description: "This is a sample API documentation",
        version: "1.0.0",
        contact: {
          name: "",
          email: ""
        },
        servers: ["http://localhost:8001"],
        filespattern: './**/*.js'
      }
    },
    apis: ["'./src/**/**/*.js'"]
  };
  
  
  
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use ("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  


// Enable CORS
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization, Observe");
    next();
});


module.exports = app;