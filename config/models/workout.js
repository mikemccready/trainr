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
  client.query('DROP TABLE IF EXISTS workouts; CREATE TABLE workouts(id SERIAL PRIMARY KEY, workout_data JSON, date timestamptz)', (err, result) => {
    done();
    if(err) return console.error('error running query', err);
    console.log(result);
  });
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})
