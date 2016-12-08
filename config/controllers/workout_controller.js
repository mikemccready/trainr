const promise = require('bluebird');
const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';;
const db = pgp(connectionString);

function createWorkout(req, res) {
  db.none(`INSERT INTO workout(created_on) VALUES(now())`)
    .then(() => {
      res.status(200).json({ status: 'success', message: 'Workout created'});
      return res.end();
    })
    .catch(err => {
      console.log('fail', err)
      return res.status(500).end();
    })
}

function getWorkouts(req, res) {
  db.any('SELECT * FROM workout')
    .then(data => {
      return res.status(200).json(data).end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting workouts').end();
    })
}

module.exports = {
  createWorkout,
  getWorkouts
}
