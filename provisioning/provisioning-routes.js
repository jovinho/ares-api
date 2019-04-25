const express = require('express');
const router = express.Router();
const ProvisioningController = require('./provisioning-controller');

router.post('/provisioning/add', ProvisioningController.addProvisioning);

module.exports = router;
