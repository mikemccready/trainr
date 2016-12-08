//server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const workoutController = require('./controllers/workout_controller');
const exerciseController = require('./controllers/exercise_controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
});

app.get('/api/workouts', workoutController.getWorkouts);
app.post('/api/workouts', workoutController.createWorkout);
app.get('/api/workouts/:workout_id/exercises', exerciseController.getWorkoutExercises)

app.get('/api/exercises', exerciseController.getAllExercises);
app.post('/api/exercises', exerciseController.createExercise);


app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);
  console.log('app is listening port 3000');
});
