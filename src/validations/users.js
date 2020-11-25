const Joi = require('joi');
exports.validateUserRegisteration = (user) => {

    const schema = Joi.object(
    {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        coordinate: Joi.array().required()
    }).unknown()
    return schema.validate(user);
}

exports.validateUserLogin = (users) => {
    const schema = Joi.object(
    {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
    return schema.validate(users);
}

exports.validateUserChangePassword = (users) => {
    const schema = Joi.object(
    {
        oldpassword: Joi.string().required(), 
        newpassword: Joi.string().required(),
    })
    return schema.validate(users);
}



