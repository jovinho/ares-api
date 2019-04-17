const r = require('rethinkdb');
const fs = require('fs');

// const rethinkdb = {
//   host: 'localhost',
//   port: 28015,
//   authKey: '',
//   db: 'scada'
// };

const cert = fs.readFileSync('./cacert');
const rethinkdb = {
  host: 'aws-us-east-1-portal.27.dblayer.com',
  port: 33174,
  password: '12345678',
  user: 'api',
  db: 'scada',
  ssl: {
    ca: cert
  }
};

/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
function createConnectionMiddleware(req, res, next) {
  r.connect(rethinkdb)
    .then(function(conn) {
      console.log('GOT A CONNECTION');
      req._rdbConn = conn;
      next();
    })
    .error(handleError(res));
}

function handleError(res) {
  return function(error) {
    console.log('Error', error);
    res.send(500, { error: error.message });
  };
}

/*
 * Close the RethinkDB connection
 */
function closeConnectionMiddleware(req, res, next) {
  console.log('CLOSING CONNECTION');
  req._rdbConn.close();
}

module.exports = {
  createConnectionMiddleware: createConnectionMiddleware,
  closeConnectionMiddleware: closeConnectionMiddleware
};
