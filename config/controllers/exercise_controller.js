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
  const userId = req.body.user_id;
  console.log(req.body)
  db.one(
    `INSERT INTO exercise(movement, weight, repetitions, created_on, workout_id, user_id)
     VALUES('${movement}', ${weight}, ${reps}, now(), ${workoutId}, ${userId})
     RETURNING movement, weight, repetitions, created_on, workout_id, user_id;`
   )
    .then(data => {
      res.status(200).json({ status: 'success', data, message: 'Exercise created'});
      return res.end();
    })
    .catch(err => {
      console.log('fail', err)
      return res.status(500).end();
    })
}

function getAllExercises(req, res) {
  db.any('SELECT * FROM exercise')
    .then(data => {
      return res.status(200).json(data).end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting exercises').end();
    })
}

function getWorkoutExercises(req, res) {
  const workoutId = req.params.workout_id;
  const userId = req.params.user_id;
  db.any(`SELECT * FROM exercise WHERE workout_id = ${workoutId} AND user_id = ${userId};`)
    .then(data => {
      return res.status(200).json(data).end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting exercises').end();
    });
}

module.exports = {
  createExercise,
  getAllExercises,
  getWorkoutExercises
}
