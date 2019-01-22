const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const listComponents = function(dbConnection, networkId) {
  return new Promise(function(resolve, reject) {
    r.table('components')
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

const getComponent = function(dbConnection, networkId, componentId) {
  return new Promise(function(resolve, reject) {
    r.table('components')
      .get(componentId)
      .run(dbConnection, function(err, network) {
        defaultErrorTreatment(err, reject);
        resolve(network);
      });
  });
};

// const createNetwork = function(dbConnection, network) {
//   return new Promise(function(resolve, reject) {
//     r
//       .table('networks')
//       .insert(network)
//       .run(dbConnection, function(err, result) {
//         defaultErrorTreatment(err, reject);

//         if (result.inserted === 1) {
//           resolve(result.generated_keys[0]);
//         }

//         resolve(result);
//       });
//   });
// };

module.exports = {
  listComponents: listComponents,
  getComponent: getComponent
};
