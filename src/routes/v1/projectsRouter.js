const projectsRouter = require("express").Router();
const { isLoggedIn } = require("../../middleware").auth;

const {
    addProject,
    getProject
  } = require("../../controllers/projectscontroller");

 projectsRouter.get(
    "/projects/",
    isLoggedIn,
    getProject
  );
  

 projectsRouter.post(
    "/projects/",
    isLoggedIn,
    addProject
  );
  

  module.exports = projectsRouter;