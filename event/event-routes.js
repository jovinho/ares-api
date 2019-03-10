const express = require('express');
const router = express.Router();
const EventController = require('./event-controller');

router.get('/event', EventController.getEvents);
router.get('/event/:id', EventController.getEventById);
module.exports = router;
