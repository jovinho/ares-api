const axios = require('axios');
const ramda = require('ramda');
const ApiHookService = require('./api-hook-service');

const invokeHook = ramda.curry(function(payload, hook) {
  return axios
    .post(hook.url, payload)
    .then(function(response) {
      console.log('HOOK INVOCADO COM SUCESSO', hook.url);
    })
    .catch(function(error) {
      console.log('ERRO AO CHAMAR O HOOK', hook.url);
    });
});

const activateHooks = function(dbConnection, type, payload) {
  const hooksPromise = ApiHookService.getHooks(dbConnection);

  hooksPromise
    .then(function(hooks) {
      switch (type) {
        case 'EVENT':
          ramda.map(
            invokeHook({
              type: 'EVENT',
              payload: payload
            }),
            hooks
          );
          break;
        default:
          break;
      }
    })
    .catch(function(err) {
      console.log('ERRO AO CHAMAR OS HOOKS');
    });
};

module.exports = {
  activateHooks: activateHooks
};
