const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

require('./setupEnv');

const connection = (database) => ({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
  database
});

module.exports = async () => {
  const dbName = process.env.DB_NAME;
  if (!/^[a-z0-9_]+_test$/.test(dbName)) {
    throw new Error(`Refusing to run tests against "${dbName}": the test database name must end with "_test".`);
  }

  const admin = new Client(connection('postgres'));
  await admin.connect();
  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (exists.rows.length === 0) {
    await admin.query(`CREATE DATABASE ${dbName}`);
  }
  await admin.end();

  const client = new Client(connection(dbName));
  await client.connect();
  await client.query(fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8'));
  await client.end();
};
