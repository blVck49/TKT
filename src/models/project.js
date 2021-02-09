const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        
    }
},
    {
        timestamps: true

    })

module.exports = mongoose.model("Project", projectSchema)