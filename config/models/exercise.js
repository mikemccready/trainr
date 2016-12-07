const pg = require('pg');
const config = {
  database: 'trainr',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if(err) return console.error('error fetching client from pool', err);
  client.query('DROP TABLE IF EXISTS exercises; CREATE TABLE exercises(id serial primary key, movement VARCHAR(255), weight INT, workout_id INT REFERENCES workouts (id))',
  (err, result) => {
    done();
    if(err) return console.error('error running query', err);
    console.log(result);
  });
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});
