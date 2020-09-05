const pool = require('./pool.js');

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
const query = (quertText, params) => {
  return new Promise((resolve, reject) => {
    pool.query(quertText, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const clientConnect = async (pool) => {
  const client = await pool
    .connect()
    .catch(err => {
      console.log("\nclient.connect():", err.name);
      // iterate over the error object attributes
      for (item in err) {
        if (err[item] != undefined) {
          process.stdout.write(item + " - " + err[item] + " ");
        }
      }

      // end the Pool instance
      console.log("\n");
      process.exit();
    });
  return client;
}

const rollback = (client) => {
  //terminating a client connection will
  //automatically rollback any uncommitted transactions
  //so while it's not technically mandatory to call
  //ROLLBACK it is cleaner and more correct
  client.query('ROLLBACK', function () {
    client.end();
    console.log('transaction ROLLBACK IS CALLED');
  });
}

module.exports = {
  query,
  clientConnect,
  rollback
}

// https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66