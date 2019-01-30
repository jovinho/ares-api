const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const getDatapaths = function(dbConnection) {
  return new Promise(function(resolve, reject) {
    r.table('datapaths')
      .filter(true)
      .run(dbConnection, function(err, cursor) {
        defaultErrorTreatment(err, reject);
        cursor.toArray(function(err, result) {
          defaultErrorTreatment(err, reject);
          resolve(result);
        });
      });
  });
};

const getDatapathById = function(dbConnection, datapathId) {
  return new Promise(function(resolve, reject) {
    r.table('datapaths')
      .getAll(datapathId, { index: 'datapathId' })
      .run(dbConnection, function(err, cursor) {
        cursor.toArray(function(err, result) {
          defaultErrorTreatment(err, reject);
          resolve(result[0] || {});
        });
      });
  });
};

module.exports = {
  getDatapaths: getDatapaths,
  getDatapathById: getDatapathById
};
