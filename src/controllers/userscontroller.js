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

            let { password, email } = req.body;
            
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
     * check if email has been registered
     */
    async emailExist(email) {
        try {
            return await userModel.findOne({ email });
        } catch (err) {
            throw err;
        }
    },

    

}

module.exports = userscontroller;