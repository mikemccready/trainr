const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE workouts(id SERIAL PRIMARY KEY, weight INT, movement TEXT)');
query.on('end', () => { client.end(); });
