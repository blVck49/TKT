const http = require("http");
const createDbConnection = require("./src/db")
const fs = require('fs');

const app = require('./app');
const port = process.env.PORT;

const server = http.createServer(app);

// Connects to mongodb
createDbConnection();

server.listen(port);