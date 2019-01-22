const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const listIeds = function(dbConnection, networkId) {
  return new Promise(function(resolve, reject) {
    r.table('ieds')
      .getAll(networkId, { index: 'networkId' })
      .run(dbConnection, function(err, cursor) {
        defaultErrorTreatment(err, reject);
        cursor.toArray(function(err, result) {
          defaultErrorTreatment(err, reject);
          resolve(result);
        });
      });
  });
};

const getIed = function(dbConnection, networkId, componentId) {
  return new Promise(function(resolve, reject) {
    r.table('ieds')
      .get(componentId)
      .run(dbConnection, function(err, network) {
        defaultErrorTreatment(err, reject);
        resolve(network);
      });
  });
};

module.exports = {
  listIeds: listIeds,
  getIed: getIed
};
