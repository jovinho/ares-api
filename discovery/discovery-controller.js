const DiscoveryService = require('./discovery-service');

const getDiscovery = async function(req, res) {
  const dbConnection = req._rdbConn;

  const result = await DiscoveryService.getDiscovery(dbConnection);
  return res.status(200).json(result);
};

module.exports = {
  getDiscovery: getDiscovery
};
