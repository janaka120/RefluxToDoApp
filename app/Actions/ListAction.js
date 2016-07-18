var Reflux = require('reflux');

var ListActions = Reflux.createActions([
  'createNote',
  'updateNote',
  'removeNote'
]);

module.exports = ListActions;