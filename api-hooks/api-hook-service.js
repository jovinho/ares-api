const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const getHooks = function(dbConnection) {
  return new Promise(function(resolve, reject) {
    r.table('hooks')
      .filter(true)
      .run(dbConnection, function(err, cursor) {
        defaultErrorTreatment(err, reject);
        cursor.toArray(function(err, result) {
          defaultErrorTreatment(err, reject);
          resolve(result);
        });
      });
  });
};

const getHookById = function(dbConnection, id) {
  return new Promise(function(resolve, reject) {
    r.table('hooks')
      .getAll(id)
      .run(dbConnection, function(err, cursor) {
        cursor.toArray(function(err, result) {
          defaultErrorTreatment(err, reject);
          if (result[0]) {
            resolve(result[0]);
          } else {
            reject({
              error: 'Not Found'
            });
          }
        });
      });
  });
};

const insertHook = function(dbConnection, hook) {
  return new Promise(function(resolve, reject) {
    r.table('hooks')
      .insert({
        id: hook.application,
        url: hook.url
      })
      .run(dbConnection, function(err, result) {
        if (err) {
          console.log('DEU ERRO', err);
          reject(err);
        }
        resolve(result);
      });
  });
};

const updateHook = function(dbConnection, hook) {
  return new Promise(function(resolve, reject) {
    r.table('hooks')
      .get(hook.application)
      .update({ url: hook.url })
      .run(dbConnection, function(err, result) {
        if (err) {
          console.log('Erro ao atualizar', err);
          reject(err);
        }
        resolve(result);
      });
  });
};

module.exports = {
  getHooks: getHooks,
  getHookById: getHookById,
  insertHook: insertHook,
  updateHook: updateHook
};
