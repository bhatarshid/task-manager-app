const mongoose = require('mongoose')
const validator = require('validator')

//task schema
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
      type: String,
      required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task