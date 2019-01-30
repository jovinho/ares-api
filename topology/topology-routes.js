const express = require('express');
const router = express.Router();
const TopologyController = require('./topology-controller');

router.get('/topology', TopologyController.getTopology);

module.exports = router;
