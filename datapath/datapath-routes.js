const express = require('express');
const router = express.Router();
const DatapathController = require('./datapath-controller');

router.get('/network/:networkId/datapath', DatapathController.getDatapaths);
router.get('/network/:networkId/datapath/:id', DatapathController.getDatapathById);
//router.post('/network/:networkId/datapath', DatapathController.createDatapath);
//router.post('/network/:networkId/component', ComponentController.createComponent);
//router.get('/network/:networkId/component/:componentId', ComponentController.getNetworkById);

module.exports = router;
