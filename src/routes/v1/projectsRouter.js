const projectsRouter = require("express").Router();
const { isLoggedIn } = require("../../middleware").auth;

const {
    addProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
  } = require("../../controllers/projectscontroller");

  projectsRouter.post(
    "/projects/",
    isLoggedIn,
    addProject
  );

 projectsRouter.get(
    "/projects/",
    isLoggedIn,
    getProjects
  );

  projectsRouter.get(
    "/projects/:id",
    isLoggedIn,
    getProject
  );

  projectsRouter.patch(
    "/projects/:id",
    isLoggedIn,
    updateProject
  );

  projectsRouter.delete(
    "/projects/:id",
    isLoggedIn,
    deleteProject
  );
  



  module.exports = projectsRouter;