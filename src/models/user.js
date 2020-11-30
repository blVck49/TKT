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

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/specialman/image/upload/f_auto,fl_lossy,q_auto/v1600110269/profile_hk4zyr.png"
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: Number,
        default: 1
    },
    resetPassword: [{
        token: Number,
        expire: Number
    }],
},
    {
        timestamps: true

    })

module.exports = mongoose.model("User", userSchema)