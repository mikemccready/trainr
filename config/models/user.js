const pg = require('pg');
const config = require('./../db.js');

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if(err) return console.error('error fetching client from pool', err);
  client.query(
    'DROP TABLE IF EXISTS users;',
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('User table dropped');
    }
  );
  client.query(
    `CREATE TABLE users(
      user_id serial PRIMARY KEY,
      email VARCHAR(355) UNIQUE NOT NULL,
      password VARCHAR(155) NOT NULL,
      created_on TIMESTAMPTZ NOT NULL
    );`,
    (err, result) => {
      done();
      if(err) return console.error('error running query', err);
      console.log('User table created');
    }
  );
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});
