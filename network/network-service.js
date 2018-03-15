const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const listNetworks = function(dbConnection) {
  return new Promise(function(resolve, reject) {
    r.table('networks').run(dbConnection, function(err, cursor) {
      defaultErrorTreatment(err, reject);
      cursor.toArray(function(err, result) {
        defaultErrorTreatment(err, reject);
        resolve(result);
      });
    });
  });
};

const getNetwork = function(dbConnection, networkId) {
  return new Promise(function(resolve, reject) {
    r
      .table('networks')
      .get(networkId)
      .run(dbConnection, function(err, network) {
        defaultErrorTreatment(err, reject);
        resolve(network);
      });
  });
};

module.exports = {
  listNetworks: listNetworks,
  getNetwork: getNetwork
};
