const mongoose = require('mongoose');

const SesionSchema = mongoose.Schema({
    aproxTotalDuration: {
        type: Number,
        required: true
    },
    actualTotalDuration: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    emotions: {
        type: String,
        required: true
    },
    exerciseToDo: {
        type: String,
        required: true
    },
    heartbeats: {
        type: String,
        required: true
    },
    moans: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sesion', SesionSchema);