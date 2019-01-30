const r = require('rethinkdb');
const datapathService = require('../datapath/datapath-service');
const interfaceService = require('../interface/interface-service');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const getTopology = function(dbConnection) {
  const datapathsPromise = datapathService.getDatapaths(dbConnection);
  const interfacesPromise = interfaceService.getInterfaces(dbConnection);

  return Promise.all([datapathsPromise, interfacesPromise])
    .then(function(values) {
      return {
        datapaths: values[0],
        interfaces: values[0]
      };
    })
    .catch(function(e) {
      console.log('ERROR', e);
    });
};

module.exports = {
  getTopology: getTopology
};
