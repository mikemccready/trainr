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
  client.query('DROP TABLE IF EXISTS exercise;',
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('Table Dropped');
    }
  );
  client.query(
    `CREATE TABLE exercise(
      exercise_id serial PRIMARY KEY,
      movement VARCHAR(50) NOT NULL,
      weight integer,
      notes VARCHAR(1000),
      created_on TIMESTAMPTZ NOT NULL,
      workout_id integer NOT NULL,
      CONSTRAINT exercise_workout_id_fkey FOREIGN KEY (workout_id)
        REFERENCES workout (workout_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
    );`,
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('Exercise table created');
    }
  );
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});
