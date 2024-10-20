const express = require('express');
const cors = require('cors');
const User = require('./models/userModel');
const mongoose = require('mongoose');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const jwt = require('jsonwebtoken');
const Workout = require('./models/workoutModel');
const Exercise = require('./models/exerciseModel');
require('dotenv').config();

const PORT = 3000;
const app = express();

mongoose.connect(process.env.DATABASE_KEY,  {useNewUrlParser: true, useUnifiedTopology: true});
app.use(cors());
app.use(express.json());

const generateToken = (user) => {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});
    return token;
}

app.post('/signup', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        res.send({ success: true, message: "User already exists" });
    }
    else {
        const newUser = new User(req.body);
        await newUser.save();
        const token = generateToken(newUser);
        res.send({  success: true, message: "User registered successfully", token: token });
    }
})

app.post('/login', async(req, res) => {
    const user = await User.findOne({ email : req.body.email });
    if (!user) {
        res.send({ success: false, message: "User does not exist" });
        return;
    }

    if (user.password != req.body.password) {
        res.send({ success: false, message: "Incorrect password" });
        return;
    }

    const token = generateToken(user);
    res.send({ success: true, message: "Logged in successfully", token: token });
})

app.get('/workouts', jwtMiddleware, async (req, res) => {
    const workouts = await Workout.find({ userId : req.body.userId });
    res.send({ success: true, message: { workouts : workouts } });
})

app.post('/workout', jwtMiddleware, async (req, res) => {
    const workout = new Workout(req.body);
    workout.userId = req.body.userId;
    await workout.save();
    res.send({ success: true, message: "workout added successfully "});
})

app.post('/exercise', jwtMiddleware, async(req, res) => {
    const exercise = new Exercise(req.body);
    exercise.userId = req.body.userId;
    await exercise.save();
    res.send({ success: true, message: "exercise added successfully" });
})

app.get('/exercises', jwtMiddleware, async(req, res) => {
    const exercises = await Exercise.find({ userId : req.body.userId });
    res.send({ success: true, message: { exercises : exercises } });
})


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}:`);
})