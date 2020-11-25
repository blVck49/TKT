const usersRouter = require("express").Router();
const { isLoggedIn, isAdmin } = require("../../middleware").auth;


const {
  register,
  login,
  getProfile,
  getUsers,
  resetPassword,
  newPassword,
  updateProfile,
  changePassword
} = require("../../controllers/userscontroller");


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
   *    image: 
   *     type: String,
   *     default: "https://res.cloudinary.com/specialman/image/upload/f_auto,fl_lossy,q_auto/v1600110269/profile_hk4zyr.png"
   *    role: 
   *     type: String,
   *     default: "user"
   *    status: 
   *     type: Number,
   *     default: 1
   *    resetPassword: 
   *     token: Number,
   *     expire: Number
   */


 /** 
 * @swagger 
 * /users:
 *  post:
 *    summary: create a user
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#definitions/User'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#definition/User'
 *    responses:
 *      "200":
 *        description: A successful response
*/

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

//change Password
usersRouter.post(
  "/users/change-password",
  isLoggedIn,
  changePassword
);


module.exports = usersRouter;