const promise = require('bluebird');
const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';;
const db = pgp(connectionString);

function createWorkout(req, res) {
  const newWorkout = {workout_data: req.body, date: new Date()};
  db.none('insert into workouts(workout_data, date) values($1, $2)', [newWorkout.workout_data, newWorkout.date])
    .then(() => {
      console.log('success')
      res.status(200)
        .json({
          status: 'success',
          message: 'Workout created'
        });
        return res.end();
    })
    .catch(err => {
      console.log('fail', err)
      return res.status(500);
    })
}

function getWorkouts(req, res) {
  db.any('select * from workouts')
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved workouts'
        });
      return res.end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting workouts')
    })
}

module.exports = {
  createWorkout,
  getWorkouts
}
