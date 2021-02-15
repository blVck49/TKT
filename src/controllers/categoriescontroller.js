const categoryModel = require("../models/category");

const mongoose = require('mongoose');


const categoriescontroller = {

    /**
     * get all categories
     */

    async getCategories(req, res) {
        try {
            let categories = await categoryModel.find();
            return res.status(200).send({
                status_code: 200,
                data: categories
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
     * register categories
     */

    async addCategories(req, res) {
        try {
            let {name} = req.body;

            let categories = await categoryModel.create({
                name
            })
            return res.status(200).send({
                status_code: 200,
                data: categories,
                message: "categories Added"
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


}
module.exports = categoriescontroller;