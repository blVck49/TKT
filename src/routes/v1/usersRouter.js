const usersRouter = require("express").Router();
const { isLoggedIn, isAdmin } = require("../../middleware").auth;


const {
  register,
  login,
  getProfile,
  getUsers,
  resetPassword,
  newPassword,
  updateProfile
} = require("../../controllers/userscontroller");


usersRouter.post(
  "/users/",
  register
);

//admin can view all registered users
usersRouter.get(
  "/users/",
  isLoggedIn,
  isAdmin,
  getUsers
);

//user sees his profile
usersRouter.get(
  "/users/profile",
  isLoggedIn,
  getProfile
);

//user updates his profile
usersRouter.patch(
  "/users/profile",
  isLoggedIn,
  updateProfile
);

//user logs in
usersRouter.post(
  "/users/login",
  login
);

//users reset password
usersRouter.post(
  "/users/reset-password",
  resetPassword
);

//user sets new password
usersRouter.post(
  "/users/new-password",
  newPassword
);


module.exports = usersRouter;
