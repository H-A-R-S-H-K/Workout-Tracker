const mongoose = require('mongoose');
const Exercise = require('./exerciseModel');

const workoutSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Exercise',
                required: true
            },
            sets: [
                {
                    reps: {
                        type: Number,
                        required: true
                    },
                    weight: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ]
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;