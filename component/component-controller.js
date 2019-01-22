// const getNetworks = function(req, res) {
//   const dbConnection = req._rdbConn;
//   const networksPromise = NetworkService.listNetworks(dbConnection);

//   networksPromise
//     .then(function(networks) {
//       res.send(networks);
//     })
//     .catch(function(err) {
//       res.status(500).json({ message: 'Um erro aconteceu' });
//     });
// };

const createComponent = function() {};

const ComponentService = require('./component-service');

const getComponents = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const componentsPromise = ComponentService.listComponents(dbConnection, networkId);

  componentsPromise
    .then(function(components) {
      res.send(components);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

// const createNetwork = function(req, res) {
//   const dbConnection = req._rdbConn;
//   const network = req.body;

//   const networkPromise = NetworkService.createNetwork(dbConnection, network)
//     .then(function(networkId) {
//       res
//         .status(201)
//         .location(networkId)
//         .json({
//           networkId: networkId
//         });
//     })
//     .catch(function(err) {
//       res.send(422);
//     });
// };

const getComponentById = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const componentId = req.params.id;
  const componetPromise = ComponentService.getComponent(dbConnection, networkId, id);

  componetPromise
    .then(function(component) {
      if (component) {
        res.send(component);
      } else {
        res.status(404).json({ message: 'Recurso não encontrado' });
      }
    })
    .catch(function(err) {
      res.send(404);
    });
};

module.exports = {
  getComponents: getComponents
};
