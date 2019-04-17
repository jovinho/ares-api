const express = require('express');
const router = express.Router();
const DiscoveryController = require('./discovery-controller');

router.get('/discovery', DiscoveryController.getDiscovery);

module.exports = router;
