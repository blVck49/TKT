const { validationResult } = require("express-validator");

const isValidInput = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({
            status_code: 400,
            message: "Validation failed",
            errors: result.array()})
    next();
}

module.exports = isValidInput;