const express = require('express');
const router = express.Router();
const ApiHookController = require('./api-hook-controller');

router.get('/hook', ApiHookController.getHooks);
router.get('/hook/:id', ApiHookController.getHookById);
router.post('/hook', ApiHookController.insertHook);

module.exports = router;
