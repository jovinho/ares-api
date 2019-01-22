const DatapathService = require('./datapath-service');

const getDatapaths = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const dapathsPromise = DatapathService.listDatapaths(dbConnection, networkId);

  dapathsPromise
    .then(function(datapaths) {
      res.send(datapaths);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

const getIedById = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const componentId = req.params.id;
  const iedsPromise = IedService.getIedById(dbConnection, networkId, id);

  iedsPromise
    .then(function(ied) {
      if (ied) {
        res.send(ied);
      } else {
        res.status(404).json({ message: 'Recurso não encontrado' });
      }
    })
    .catch(function(err) {
      res.send(404);
    });
};

module.exports = {
  getDatapaths: getDatapaths,
  getIedById: getIedById
};
