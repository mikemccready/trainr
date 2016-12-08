const promise = require('bluebird');
const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';
const db = pgp(connectionString);

function createExercise(req, res) {
  const movement = req.body.movement;
  const weight = req.body.weight;
  const reps = req.body.repetitions;
  const workoutId = req.body.workout_id;
  db.none(
    `INSERT INTO exercise(movement, weight, repetitions, created_on, workout_id)
     VALUES(
       '${movement}',
       ${weight},
       ${reps},
       now(),
       ${workoutId}
     );`)
    .then(() => {
      console.log('success')
      res.status(200)
        .json({
          status: 'success',
          message: 'Exercise created'
        });
        return res.end();
    })
    .catch(err => {
      console.log('fail', err)
      return res.status(500);
    })
}

function getAllExercises(req, res) {
  db.any('SELECT * FROM exercise')
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved exercises'
        });
      return res.end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting exercises')
    })
}

module.exports = {
  createExercise,
  getAllExercises
}
