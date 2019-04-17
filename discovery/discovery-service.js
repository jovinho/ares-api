const axios = require('axios');
const DatapathService = require('../datapath/datapath-service');

const API_URL = 'http://192.168.56.102:8080';

const isMacAddress = function(text) {
  var regex = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$');
  return regex.test(text);
};

const getNetworkDiscovery = async function() {
  try {
    const result = await axios.get(`${API_URL}/discovery`);
    return result.data;
  } catch (e) {
    console.error('REQUEST FAILED');
    return null;
  }
};

const getDatapaths = function(networkDiscovery) {
  const dps = networkDiscovery.datapaths;
  return dps.map(dp => {
    const isHost = isMacAddress(dp);
    return {
      type: isHost ? 'HOST' : 'SWITCH',
      id: dp
    };
  });
};

// const buildSwitchesInfo = function(dbConnection, datapaths) {
//   const switches = datapaths.filter(dp => dp.type === 'SWITCH');

//   return Promise.all(switches.map(sw => buildSwitchInfo(dbConnection, sw)));
// };
const transformSwitchToDatapath = function(sw, ryuSwitch, formattedDpid) {
  return {
    id: formattedDpid,
    name: ryuSwitch.dp_desc,
    type: 'SWITCH',
    vendorName: ryuSwitch.mfr_desc,
    serialNumber: ryuSwitch.serial_num,
    modelName: ryuSwitch.hw_desc,
    softwareDescription: ryuSwitch.sw_desc
  };
};

const buildSwitchDatapath = async function(sw) {
  try {
    const formattedDpid = parseInt(sw.dpid).toString();
    const response = await axios.get(`${API_URL}/stats/desc/${formattedDpid}`);
    const ryuObj = response.data[formattedDpid];
    return transformSwitchToDatapath(sw, ryuObj, formattedDpid);
  } catch (e) {
    console.error('QUEBROU');
    return null;
  }
};

const buildSwitchesDatapath = async function(switches) {
  let sws = [];
  for (var i = 0; i < switches.length; i++) {
    const sw = await buildSwitchDatapath(switches[i]);
    if (sw) {
      sws.push(sw);
    }
  }
  return sws;
};

const buildHostDatapath = async function(dbConnection, host) {
  const dbHost = await DatapathService.getDatapathByMac(dbConnection, host.mac);
  if (dbHost) {
    return dbHost;
  } else {
    return null;
  }
};

const buildHostsDatapath = async function(dbConnection, hosts) {
  let hsts = [];
  for (var i = 0; i < hosts.length; i++) {
    const host = await buildHostDatapath(dbConnection, hosts[i]);
    if (host) {
      hsts.push(host);
    }
  }
  return hsts;
};

const buildDatapaths = async function(dbConnection, networkDiscovery) {
  const switches = await buildSwitchesDatapath(networkDiscovery.switches);
  const hosts = await buildHostsDatapath(dbConnection, networkDiscovery.hosts);

  return [...switches, ...hosts];
};

const isDatapathEqual = function(dpId1, dpId2) {
  return parseInt(dpId1).toString() === parseInt(dpId2).toString();
};

const findSwitch = function(networkDiscovery, dpid) {
  return networkDiscovery.switches.find(el => isDatapathEqual(el.dpid, dpid));
};

const findNextInterface = function(mac, links) {
  for (let i = 0; i < links.length; i++) {
    if (links[i].src.hw_addr === mac) {
      return links[i].dst.hw_addr;
    }
  }
  return null;
};

const getDatapathInterfaces = function(datapath, networkDiscovery) {
  if (datapath.type === 'IED') {
    const hosts = networkDiscovery.hosts;
    const host = hosts.find(el => el.mac === datapath.mac);
    return [
      {
        id: `interface-ied[${datapath.id}]`,
        nextInterface: host.port.hw_addr,
        datapathId: datapath.id,
        macAddress: host.mac,
        ipAddress: host.ipv4[0]
      }
    ];
  } else {
    const interfaces = [];
    const links = networkDiscovery.links;
    const dpId = datapath.id;
    const swt = findSwitch(networkDiscovery, dpId);
    const ports = swt.ports;

    for (let i = 0; i < ports.length; i++) {
      const nextInterface = findNextInterface(ports[i].hw_addr, links);
      const interface = {
        id: ports[i].name,
        datapathId: dpId,
        ipAddress: '',
        macAddress: ports[i].hw_addr,
        nextInterface: nextInterface
      };
      interfaces.push(interface);
    }
    return interfaces;
  }
};

/*
	SE FOR IED, SÓ TEM UMA INTERFACE, SE NÃO, TEM UMA OU MAIS INTERFACES
	"nextInterfaceId": "IDINTERFACE4",
	"macAddress": "00-14-22-01-23-45",
	"datapathId": "12345678-8764idAtribuidoPeloRYU",
	"ipAddress": "192.168.1.3",
	"id": "2665db7f-e823-4aa8-a047-9d99605c6ec9"
*/
const buildInterfaces = function(datapaths, networkDiscovery) {
  let intfcs = [];

  for (let i = 0; i < datapaths.length; i++) {
    const interfaces = getDatapathInterfaces(datapaths[i], networkDiscovery);
    intfcs = intfcs.concat(interfaces);
  }

  return intfcs;
};

const getDiscovery = async function(dbConnection) {
  const networkDiscovery = await getNetworkDiscovery();

  const datapaths = await buildDatapaths(dbConnection, networkDiscovery);
  const interfaces = await buildInterfaces(datapaths, networkDiscovery);

  return {
    datapaths: datapaths,
    interfaces: interfaces
  };
};

module.exports = {
  getDiscovery: getDiscovery
};
