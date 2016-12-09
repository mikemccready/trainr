const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');

const userController = require('./controllers/user_controller');
const workoutController = require('./controllers/workout_controller');
const exerciseController = require('./controllers/exercise_controller');
const passportService = require('./services/passport');
// authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// serve index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../dist/index.html'));
});

// api routes
router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.signupUser);

router.get('/api/workouts', workoutController.getWorkouts);
router.post('/api/workouts', workoutController.createWorkout);
router.get('/api/workouts/:workout_id/exercises', exerciseController.getWorkoutExercises);

router.get('/api/exercises', exerciseController.getAllExercises);
router.post('/api/exercises', exerciseController.createExercise);

router.get('/test', requireAuth, (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = router;
