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
 * /users:
 *  post:
 *    summary: create a user
 *    consumes:
 *     - application/x-www-form-urlencoded
 *    produces:
 *     - application/json
 *    parameters:
 *      - name: firstname
 *        in: formData
 *        required: true
 *      - name: lastname
 *        in: formData
 *        required: true
 *      - name: email
 *        in: formData
 *        required: true
 *      - name: password
 *        in: formData
 *        required: true
 *      - name: image
 *        in: formData
 *        required:
 *      - name: role
 *        in: formData
 *        required: true
 *        default: user
 *      - name: status
 *        in: formData
 *        required:
 *    responses:
 *      "200":
 *        description: User Created successfully
 *        schema:
 *         $ref: '#/definitons/User'
 *      "500":
 *        description: Internal server error
*/

usersRouter.post(
  "/users/",
  register
);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: get all users
 *    description: get all registered users
 *    responses:
 *      200:
 *        description: success
 *      500:
 *        description: Internal server error
 */
//admin can view all registered users
usersRouter.get(
  "/users/",
  isLoggedIn,
  isAdmin,
  getUsers
);

/**
 * @swagger
 * /users/profile:
 *  get:
 *    summary: get profile 
 *    description: get registered user profile
 *    parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *         type: integer
 *        required: true
 *        description: id of the user
 *    responses:
 *      200:
 *        description: success
 *      500:
 *        description: Internal server error
 */
//user sees his profile
usersRouter.get(
  "/users/profile",
  isLoggedIn,
  getProfile
);

/** 
 * @swagger 
 * /users/profile:
 *  patch:
 *    summary: update a user
 *    consumes:
 *     - application/x-www-form-urlencoded
 *    produces:
 *     - application/json
 *    parameters:
 *      - name: firstname
 *        in: formData
 *        required: true
 *      - name: lastname
 *        in: formData
 *        required: true
 *      - name: email
 *        in: formData
 *        required: true
 *      - name: password
 *        in: formData
 *        required: true
 *      - name: image
 *        in: formData
 *        required:
 *      - name: role
 *        in: formData
 *        required: true
 *        default: user
 *      - name: status
 *        in: formData
 *        required:
 *    responses:
 *      "200":
 *        description: User updated
 *        schema:
 *         $ref: '#/definitons/User'
 *      "500":
 *        description: Internal server error
*/

//user updates his profile
usersRouter.patch(
  "/users/profile",
  isLoggedIn,
  updateProfile
);

/**
 * @swagger
 * /users/login:
 *  post:
 *   summary: user login
 *   description: logins user into the system
 *   consumes: 
 *    - application/x-www-form-urlencoded
 *   produces:
 *    - application/json
 *   parameters:  
 *    - name: email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      in: formData
 *      required: true
 *      type: string
 *   responses:
 *    201:
 *     description: successful login 
 *     schema:
 *      $ref: '#/definitons/User' 
 *    401:
 *     description: Authentication failed 
 */
//user logs in
usersRouter.post(
  "/users/login",
  login
);

/**
 * @swagger
 * /users/reset-password:
 *  post:
 *    summary: reset password
 *    description: 'The reset password endpoint expects an email and new password in the request body. It updates the password for the user record with matching email and attempts to send a confirmation email.'
 *    consumes:
 *      - application/x-www-form-url-encodded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: email
 *        in: formData
 *        description: users email address
 *        required: true
 *        type: string
 *    responses: 
 *      200:
 *        description: reset password successful
 *        schema:
 *          $ref: '#/defintions/User'
 *      500:
 *        description: Error
 */
//users reset password
usersRouter.post(
  "/users/reset-password",
  resetPassword
);

/**
 * @swagger
 * users/new-password:
 *  post:
 *    summary: set new password
 *    consumes:
 *      - application/x-www-form-url-encodded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: email
 *        in: formData
 *        description: users email address
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        description: users password
 *        required : true
 *        type: string
 *      - name: token
 *        in: formData
 *        description: token
 *        required: true
 *        type: string
 *    responses: 
 *      200:
 *        description: password successfully changed
 *        schema:
 *          $ref: '#/defintions/User'
 *      404:
 *        description: invalid token or email
 *      500:
 *        description: Error
 */

//user sets new password
usersRouter.post(
  "/users/new-password",
  newPassword
);

/**
 * @swagger
 * users/change-password:
 *  post:
 *    summary: change user password
 *    consumes:
 *      - application/x-www-form-url-encodded
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: email
 *        in: formData
 *        description: users email address
 *        required: true
 *        type: string
 *      - name: oldpassword
 *        in: formData
 *        description: old password
 *        required : true
 *        type: string
 *      - name: newpassword
 *        in: formData
 *        description: new password
 *        required: true
 *        type: string
 *    responses: 
 *      200:
 *        description: password successfully changed
 *        schema:
 *          $ref: '#/defintions/User'
 *      404:
 *        description: password not correct
 *      500:
 *        description: Error
 */

//change Password
usersRouter.post(
  "/users/change-password",
  isLoggedIn,
  changePassword
);


module.exports = usersRouter;