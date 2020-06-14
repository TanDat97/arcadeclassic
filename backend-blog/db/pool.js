const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

module.exports = pool

// https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66