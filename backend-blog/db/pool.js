const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool

// https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66