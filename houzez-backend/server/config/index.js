const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  server: {
    port: process.env.APP_PORT || 5000,
  },
  database: {
    db_uri: process.env.MONGO_URI || 'mongodb://localhost:27018',
    db_name: process.env.MONGO_DB || 'fleet',
  },
};
