const ProvisioningService = require('./provisioning-service');

const addProvisioning = async function(req, res) {
  const body = req.body;
  const result = await ProvisioningService.addProvisioning(body.source, body.destination);
  const secondResult = await ProvisioningService.addProvisioning(body.destination, body.source);
  return res.status(200).json(result);
};

module.exports = {
  addProvisioning: addProvisioning
};
