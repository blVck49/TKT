const http = require("http");
const createDbConnection = require("./src/db")
const fs = require('fs');

const app = require('./app');
const port = process.env.PORT;

const server = http.createServer(app);

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
        servers: ["http://localhost:8001"]
      }
    },
    apis: ["app.js"]
  };
  
  
  
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use ("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  
  /**
   * @swagger
   * definitions:
   *  User:
   *   type: object
   *   properties:
   *    firstname:
   *     type: string
   *    lastname:  
   *     type: string
   *    email: 
   *     type: string
   *     example: 'bettybutter@gmail.com'
   *    password: 
   *     type: string
   */
  
   

// Connects to mongodb
createDbConnection();

server.listen(port);