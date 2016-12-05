const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';

const pool = new pg.Pool(connectionString);

pool.connect((err, client, done) => {
  if(err) return console.error('error fetching client from pool', err);
  client.query('DROP TABLE workouts; CREATE TABLE workouts(id SERIAL PRIMARY KEY, weight INT, movement TEXT)', (err, result) => {
    done();
    if(err) return console.error('error running query', err);
    console.log(result);
  });
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})
