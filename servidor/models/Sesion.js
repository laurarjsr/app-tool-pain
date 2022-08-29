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
        type: Array,
        required: false
    },
    exerciseToDo: {
        type: String,
        required: true
    },
    heartbeats: {
        type: Array,
        required: false
    },
    moans: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('Sesion', SesionSchema);