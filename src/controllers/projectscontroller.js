const projectModel = require("../models/project");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY;

const mongoose = require('mongoose');


const projectscontroller = {

    /**
     * get all projects
     */

    async getProject(req, res) {
        try {
            let projects = await projectModel.find();
            return res.status(200).send({
                status_code: 200,
                data: projects
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
     * register projects
     */

    async addProject(req, res) {
        try {
            let { title, description } = req.body;

            let projects = await projectModel.create({
                title, description
            })
            return res.status(200).send({
                status_code: 200,
                data: projects,
                message: "project Added"
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
module.exports = projectscontroller;