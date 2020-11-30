const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const getToken = require("../utils/getToken");
const _ = require("lodash");
const mongoose = require('mongoose')
const SECRETE_KEY = process.env.SECRETE_KEY;


const userscontroller = {

    /**
     * get all users
     * 
     */
    async getUsers(req, res) {
        try {
            let users = await userModel.find();

            return res.status(200).send({
                status_code: 200,
                data: users
            });

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                detail: error.message,
                message: "Internal server error!",

                request: req.body


            });

        }
    },

    /**
     * Register a new user
     * @param {*} req 
     * @param {*} res 
     */

    async register(req, res) {
        try {

            let { firstname, lastname, password, email } = req.body;
            
            //check if user exist
            let user = await userscontroller.emailExist(email);

            if (user) {
                return res.status(400).send({
                    status_code: 400,
                    message: "User already exist, please login",
                    data: user,

                    request: req.body

                  

                });
            }

            //hash password
            if (password) {
                password = bcrypt.hashSync(password, 8);
        

            }
            console.log("email")


            user = await userModel.create({
                ...req.body,
                password: password
            })
            console.log("email")


            // get jwt
            const token = getToken(user, SECRETE_KEY);
            
            return res.status(200).send({
                status_code: 200,
                message: "Registration successful!",
                token: token
            });



        } catch (err) {

            return res.status(500).send({
                status_code: 500,
                detail: err.message,
                message: "Internal server error!",
                data: err,
                response: req.body
            });
        }
    },

    /**
     * login registered user
     * @param {*} req 
     * @param {*} res 
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userscontroller.emailExist(email);

            if (!user)
                return res.status(400).send({
                    status_code: 400,
                    message: "Incorrect email and password combination!"
                });

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword)
                return res.status(400).send({
                    status_code: 400,
                    message: "Incorrect email and password combination!",

                    request: req.body

                });

            // get jwt
            const token = getToken(user, SECRETE_KEY, "365d");

            return res.status(200).send({
                status_code: 200,
                message: "Login successful!",
                token,

                request: req.body

               

            });

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                detail: error.message,
                message: "Internal server error!",
                data: error,

                request: req.body

            });
        }

    },

    /**
     * forgot password
     * @param {*}  
     */
    async resetPassword(req, res) {
        try {
            const { email } = req.body;
            
            //generate reset token

           /* const rnd = Math.floor(
                Math.random() * (99999 - 22222) + 22222
            );*/

            const rnd = 1234; //default token for testing purpose

            const user = await userModel.findOneAndUpdate(
                { email: email },
                {
                    resetPassword: {
                        token: rnd,
                        expire: new Date().getTime() + (60000 * 20)
                    }
                },
                { new: true }
            )

            if (!user) {
                return res
                    .status(404)

                    .send({ status_code: 404, message: "User not found!", request: req.body });

                    


            }

            //send token to email

            return res.status(200).send({
                status_code: 200,
                message: "Token have been sent to your email!"
            });

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                message: error.message, //"Internal server error!"
                data: error,

                request: req.body 

            });
        }
    },

    /**
     * check if email has been registered
     */
    async emailExist(email) {
        try {
            return await userModel.findOne({ email });
        } catch (err) {
            throw err;
        }
    },

    /**
     * check admin
     */
    async getAdmin(id) {
        try {
            return await userModel.findOne({
                _id: id,
                role: "admin"
            });
        } catch (err) {
            throw err;
        }
    },

    async newPassword(req, res) {
        try {
            const { email, password, token } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);

            const user = await userModel.findOne(
                {
                    'resetPassword.token': token,
                    'email': email
                }
            )

            if (!user) {
                return res
                    .status(404)

                    .send({ status_code: 404, message: "Invalid token or email, please try again!", request: req.body });

            }

            if (user) {
                //check if OTP has expired
                if (user.resetPassword.expire < new Date().getTime()) {
                    return res
                        .status(404)

                        .send({ status_code: 404, message: "Token expired, please try again!", request: req.body });

                }
            }

            //success then change password
            await user.updateOne({
                password: hashedPassword,
                resetPassword: {
                    token: null,
                    expire: null
                }
            })

            return res.status(200).send({
                status_code: 200,
                message: "Password changed!",

                request: req.body

               

            });


        } catch (error) {

            return res.status(500).send({
                status_code: 500,

                message: error.message,//"Internal server error!"
                data: error,
                request: req.body

                

            });

        }
    },

    /**
     * get password
     */

    async getProfile(req, res) {
        try {
            let user_id = req.user.currentUser._id;

            let user = await userModel.find({
                _id: user_id
            });

            return res.status(200).send({
                status_code: 200,
                data: user,

                request: req.body

            });

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                detail: error.message,
                message: "Internal server error!",
                data: error,

                request: req.body

            });
        }

    },

    /**
     * update profile
     */

    async updateProfile(req, res) {
        try {
            let body = _.pick(req.body, ['firstname', 'lastname']) //list all the updatable fields
            let user_id = req.user.currentUser._id;

            let user = await userModel.findByIdAndUpdate(user_id, body, { new: true }).lean();

            return res.status(200).send({
                status_code: 200,
                message: "Profile updated",
                data: user,

                request: req.body

            });

        } catch (error) {
            return res.status(500).send({
                status_code: 500,
                detail: error.message,
                message: "Internal server error!",
                data: error,

                request: req.body


            });
        }

    },

    /**
     * Change Password
     */

    async changePassword(req, res) {
        try {
            const { oldpassword, newpassword } = req.body;

            let user = await userModel.findOne(
                {
                    'email': req.user.currentUser.email
                }
            )

            const validPassword = bcrypt.compareSync(oldpassword, user.password);


            if(validPassword)
            {
                //change password here
                const hashedPassword = bcrypt.hashSync(newpassword, 8);
                await user.updateOne({
                    password: hashedPassword
                })

                return res.status(200).send({
                    status_code: 200,
                    message: "Password changed!",

                    request: req.body

                });
    
            }

            //old password not correct
            return res.status(404).send({
                status_code: 404,
                message: "Password not correct!",

                request: req.body

                

            });


        } catch (error) {

            return res.status(500).send({
                status_code: 500,

                message: error.message,//"Internal server error!"
                data: error,
                request: req.body

  
            });

        }
    },


}

module.exports = userscontroller;