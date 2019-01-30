const express = require('express');
const router = express.Router();
const DatapathController = require('./datapath-controller');

router.get('/datapath', DatapathController.getDatapaths);
router.get('/datapath/:id', DatapathController.getDatapathById);
module.exports = router;
