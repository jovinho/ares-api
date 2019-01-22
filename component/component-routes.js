const express = require('express');
const router = express.Router();
const ComponentController = require('./component-controller');

/* GET home page. */
router.get('/network/:networkId/component', ComponentController.getComponents);
//router.post('/network/:networkId/component', ComponentController.createComponent);
//router.get('/network/:networkId/component/:componentId', ComponentController.getNetworkById);

module.exports = router;
