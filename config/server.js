//server.js
const express = require('express');
const bodyParser = require('body-parser');

const workoutController = require('./controllers/workout_controller');
console.log(workoutController);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/workouts', workoutController.getWorkouts);
app.post('/api/workouts', workoutController.createWorkout);

app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);
  console.log('app is listening port 3000');
});
