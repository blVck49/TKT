const Router = require('express').Router();
const v1Routes = require("./v1"); // Array of v1 routes


// On '/api/v1' use v1 routes
Router.use('/v1', ...v1Routes);


module.exports = Router;