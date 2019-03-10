const EventService = require('./event-service');

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

module.exports = {
  getEvents: getEvents,
  getEventById: getEventById
};
