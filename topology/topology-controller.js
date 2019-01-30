const TopologyService = require('./topology-service');

const getTopology = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const topologyPromise = TopologyService.getTopology(dbConnection);

  topologyPromise
    .then(function(topology) {
      res.send(topology);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

module.exports = {
  getTopology: getTopology
};
