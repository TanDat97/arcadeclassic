var { merge } = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PORT: 4000,
  MANAGEMENT_API: '"http://localhost:9000"',
  GOOGLE_API_KEY: '"AIzaSyBEJ-DBtA9XIDC97Kszq02--OSEFByGpGA"',
})
