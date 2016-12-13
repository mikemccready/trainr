const pg = require('pg');
const config = require('./../db.js');

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if(err) return console.error('error fetching client from pool', err);
  client.query(
    'DROP TABLE IF EXISTS workout;',
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('Workouts table dropped');
    }
  );
  client.query(
    `CREATE TABLE workout(
      workout_id serial PRIMARY KEY,
      notes VARCHAR(1000),
      created_on TIMESTAMPTZ NOT NULL,
      user_id integer NOT NULL,
      CONSTRAINT workout_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
    );`,
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('Workouts table created');
    }
  );
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});
