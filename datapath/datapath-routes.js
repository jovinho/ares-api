const express = require('express');
const router = express.Router();
const DatapathController = require('./datapath-controller');

router.get('/datapath', DatapathController.getDatapaths);
router.get('/datapath/:id', DatapathController.getDatapathById);
//router.post('/network/:networkId/datapath', DatapathController.createDatapath);
//router.post('/network/:networkId/component', ComponentController.createComponent);
//router.get('/network/:networkId/component/:componentId', ComponentController.getNetworkById);

module.exports = router;
