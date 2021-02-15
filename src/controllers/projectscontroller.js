const projectModel = require("../models/project");
const userModel = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY;

const mongoose = require('mongoose');


const projectscontroller = {

    /**
     * get all projects
     */

    async getProjects(req, res) {
        try {
            //let projects = await projectModel.find();
            let projects = await projectModel.aggregate([
                {
                    $lookup:{
                        from: "categories",
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ])
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
     * get all projects in a category
     */

    async getProject(req, res) {
        try {
            let projects = await projectModel.aggregate([
                    {$match: {category_id: mongoose.Types.ObjectId(req.params.id) }},
                {
                    $lookup:{
                        from: "categories",
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ])
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
            let { title, description, category_id } = req.body;

            let projects = await projectModel.create({
                ...req.body
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

    /**
     * Update project
     */

    async updateProject(req, res) {
        try {
            var temp = req.body
            let project = await projectModel.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: temp});

            return res.status(200).send({
                status_code: 200,
                data: project,
                message: "project updated"
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
     * Delete project
     */

    async deleteProject(req, res) {
        try {
            let project = await projectModel.findById(req.params.id);
            await project.remove();
            
            return res.status(200).send({
                status_code: 200,
                data: project,
                message: "project deleted"
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