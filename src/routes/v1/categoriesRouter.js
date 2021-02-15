const categoriesRouter = require("express").Router();
const { isLoggedIn } = require("../../middleware").auth;

const {
    addCategories,
    getCategories
  } = require("../../controllers/categoriescontroller");

 categoriesRouter.get(
    "/categories/",
    isLoggedIn,
    getCategories
  );
  

 categoriesRouter.post(
    "/categories/",
    isLoggedIn,
    addCategories
  );
  

  module.exports = categoriesRouter
;