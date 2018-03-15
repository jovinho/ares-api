r = require('rethinkdb');

const rethinkdb = {
  host: 'localhost',
  port: 28015,
  authKey: '',
  db: 'hades'
};

/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
function createConnectionMiddleware(req, res, next) {
  r
    .connect(rethinkdb)
    .then(function(conn) {
      req._rdbConn = conn;
      next();
    })
    .error(handleError(res));
}

function handleError(res) {
  return function(error) {
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
