const ApiHookService = require('./api-hook-service');

const getHooks = function(req, res) {
  const dbConnection = req._rdbConn;
  const hooksPromise = ApiHookService.getHooks(dbConnection);

  hooksPromise
    .then(function(hooks) {
      res.send(hooks);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

const getHookById = function(req, res) {
  const dbConnection = req._rdbConn;
  const id = req.params.id;

  const hookPromise = ApiHookService.getHookById(dbConnection, id);

  hookPromise
    .then(function(hook) {
      res.send({
        application: hook.id,
        url: hook.url
      });
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
};

const insertHook = function(req, res) {
  const dbConnection = req._rdbConn;
  const hook = req.body;

  const hookByIdPromise = ApiHookService.getHookById(dbConnection, hook.application);

  hookByIdPromise
    .then(function(dbHook) {
      const hookUpdatePromise = ApiHookService.updateHook(dbConnection, hook);

      hookUpdatePromise
        .then(function(result) {
          res.status(200).send(result);
        })
        .catch(function(err) {
          res.status(500).json(err);
        });
    })
    .catch(function(err) {
      const insertHookPromise = ApiHookService.insertHook(dbConnection, hook);

      insertHookPromise
        .then(function(result) {
          res.status(201).send(result);
        })
        .catch(function(err) {
          res.status(500).json(err);
        });
    });
};

module.exports = {
  getHooks: getHooks,
  getHookById: getHookById,
  insertHook: insertHook
};
