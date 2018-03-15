const NetworkService = require('./network-service');

const getNetworks = function(req, res) {
  const dbConnection = req._rdbConn;
  const networksPromise = NetworkService.listNetworks(dbConnection);

  networksPromise
    .then(function(networks) {
      res.send(networks);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

const createNetwork = function(req, res) {
  const dbConnection = req._rdbConn;
  const network = req.body;

  const networkPromise = NetworkService.createNetwork(dbConnection, network)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(err) {
      res.send(422);
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
        res.status(404).json({ message: 'Recurso não encontrado' });
      }
    })
    .catch(function(err) {
      res.send(404);
    });
};

module.exports = {
  getNetworks: getNetworks,
  getNetworkById: getNetworkById,
  createNetwork: createNetwork
};
