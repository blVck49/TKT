const usersRouter = require("express").Router();
const { isLoggedIn, isAdmin } = require("../../middleware").auth;


const {
  register,
  login,
 
} = require("../../controllers/userscontroller");



//register a user
usersRouter.post(
  "/users/",
  register
);

//user logs in
usersRouter.post(
  "/users/login",
  login
);

// //admin can view all registered users
// usersRouter.get(
//   "/users/",
//   isLoggedIn,
//   isAdmin,
//   getUsers
// );





module.exports = usersRouter;