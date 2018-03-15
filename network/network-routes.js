const express = require('express');
const router = express.Router();
const NetworkController = require('./network-controller');

/* GET home page. */
router.get('/', NetworkController.getNetworks);
router.post('/', NetworkController.createNetwork);
router.get('/:id', NetworkController.getNetworkById);

module.exports = router;
