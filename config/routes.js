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
const requireSignin = passport.authenticate('local', { session: false });

// serve index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../dist/index.html'));
});

// api routes
router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.signupUser);
router.post('/api/users/signin', requireSignin, userController.signinUser);
router.delete('/api/users/:user_id', userController.deleteUser);

router.get('/api/users/:user_id/workouts', requireAuth, workoutController.getWorkouts);
router.post('/api/users/:user_id/workouts', requireAuth, workoutController.createWorkout);
router.get('/api/users/:user_id/workouts/:workout_id/exercises', requireAuth, exerciseController.getWorkoutExercises);

router.get('/api/users/:user_id/exercises', requireAuth, exerciseController.getAllExercises);
router.post('/api/users/:user_id/exercises', requireAuth, exerciseController.createExercise);

module.exports = router;
