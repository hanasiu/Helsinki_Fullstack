const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
    },
    timestamp: {
        type: Date,
        required: false,
        default: Date.now,
    },
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    likes: Number,
    comments: [commentSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema)
