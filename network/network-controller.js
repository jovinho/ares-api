const NetworkService = require('./network-service');

const getNetworks = function(req, res) {
  const dbConnection = req._rdbConn;
  const networksPromise = NetworkService.listNetworks(dbConnection);

  networksPromise
    .then(function(networks) {
      res.send(networks);
    })
    .catch(function(err) {
      throw err;
    });
};

const getNetworkById = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.id;
  const networkPromise = NetworkService.getNetwork(dbConnection, networkId);

  networkPromise
    .then(function(network) {
      if (network) {
        res.send(network);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function(err) {
      res.send(404);
    });
};

module.exports = {
  getNetworks: getNetworks,
  getNetworkById: getNetworkById
};
