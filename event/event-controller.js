const EventService = require('./event-service');
const ApiHooksLogic = require('../api-hooks/api-hooks-logic');

const getEvents = function(req, res) {
  const dbConnection = req._rdbConn;
  const eventsPromise = EventService.getEvents(dbConnection);

  eventsPromise
    .then(function(events) {
      res.send(events);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

const getEventById = function(req, res) {
  const dbConnection = req._rdbConn;
  const id = req.params.id;
  const eventPromise = EventService.getEventById(dbConnection, id);

  eventPromise
    .then(function(event) {
      if (event) {
        res.send(event);
      } else {
        res.status(404).json({ message: 'Evento não encontrado' });
      }
    })
    .catch(function(err) {
      res.send(404).json({ message: err });
    });
};

const insertEvent = function(req, res) {
  const dbConnection = req._rdbConn;
  const event = req.body;

  const eventPromise = EventService.insertEvent(dbConnection, event);

  eventPromise
    .then(function(result) {
      ApiHooksLogic.activateHooks(dbConnection, 'EVENT', event);
      res.send(201).json(result);
    })
    .catch(function(err) {
      res.send(500).json(err);
    });
};

module.exports = {
  getEvents: getEvents,
  getEventById: getEventById,
  insertEvent: insertEvent
};
