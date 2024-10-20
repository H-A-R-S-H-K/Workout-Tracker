const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        require: true
    }

});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;