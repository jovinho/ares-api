const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const getEvents = function(dbConnection) {
  return new Promise(function(resolve, reject) {
    r.table('events')
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

const getEventById = function(dbConnection, datapathId) {
  // return new Promise(function(resolve, reject) {
  //   r.table('events')
  //     .getAll(id, { index: 'datapathId' })
  //     .run(dbConnection, function(err, cursor) {
  //       cursor.toArray(function(err, result) {
  //         defaultErrorTreatment(err, reject);
  //         resolve(result[0] || {});
  //       });
  //     });
  // });
};

module.exports = {
  getDatapaths: getDatapaths,
  getDatapathById: getDatapathById
};
