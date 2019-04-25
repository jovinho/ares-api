const axios = require('axios');
const DatapathService = require('../datapath/datapath-service');

const API_URL = 'http://192.168.56.102:8080';

const isMacAddress = function(text) {
  var regex = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$');
  return regex.test(text);
};

const addProvisioning = async function(body) {
  try {
    const result = await axios({
      url: `${API_URL}/provisioning/add`,
      method: 'post',
      data: body
    });
    return result.data;
  } catch (e) {
    console.error('REQUEST FAILED');
    return null;
  }
};

module.exports = {
  addProvisioning: addProvisioning
};
